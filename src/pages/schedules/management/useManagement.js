import { useApolloClient } from "@apollo/react-hooks";
import dayjs from "dayjs";
import gql from "graphql-tag";
import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { useNavigate } from "react-router-native";
import { useAppContext } from "../../../appProvider";
import withGraphqlErrorHandler from "../../../utils/withGraphqlErrorHandler";

const SCHEDULES_PER_DAY = gql`
  query SchedulesPerDay($where: ScheduleWhereInput) {
    schedulesPerDay(where: $where) {
      start
      end
      type
    }
  }
`;

const SAVE_SCHEDULE = gql`
  mutation SaveSchedule($schedule: ScheduleInput!) {
    saveSchedule(schedule: $schedule) {
      haircut {
        duration
        name
        id
      }
      scheduleDate
      user {
        id
        username
      }
    }
  }
`;

export default function useManagement() {
  const [haircut, setHaircut] = useState(null);
  const [selectedScheduleDate, setSelectedScheduleDate] = useState({
    start: null,
    end: null,
  });
  const [date, setDate] = useState(dayjs());
  const [busyDates, setBusyDates] = useState([]);
  const client = useApolloClient();
  const [{ user }] = useAppContext();
  const navigate = useNavigate();

  const onSubmit = withGraphqlErrorHandler(async () => {
    if (!haircut) {
      Alert.alert("Debes seleccionar un corte de pelo");
      return;
    } else if (!date) {
      Alert.alert("Debes seleccionar una fecha");
      return;
    } else if (!selectedScheduleDate.start) {
      Alert.alert("Debes seleccionar un horario para la agenda");
      return;
    }

    const scheduleDate = date
      .set("hour", selectedScheduleDate.start.get("hours"))
      .set("minute", selectedScheduleDate.start.get("minutes"))
      .set("second", 0);

    const payload = {
      schedule: {
        userId: user.id,
        haircutId: haircut.id,
        scheduleDate,
      },
    };

    await client.mutate({
      mutation: SAVE_SCHEDULE,
      variables: payload,
    });

    Alert.alert("Cita agendada exitosamente");

    navigate(-1);
  });

  useEffect(() => {
    async function fn() {
      try {
        const {
          data: { schedulesPerDay },
        } = await client.query({
          query: SCHEDULES_PER_DAY,
          variables: { where: { date: date.format("YYYY-MM-DD") } },
          fetchPolicy: 'network-only'
        });

        setBusyDates(schedulesPerDay);
      } catch (error) {
        console.log(error);
      }
    }
    if (date) fn();
  }, [date]);

  return {
    haircut,
    setHaircut,
    date,
    setDate,
    selectedScheduleDate,
    setSelectedScheduleDate,
    onSubmit,
    busyDates,
  };
}
