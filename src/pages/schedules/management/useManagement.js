import { useMutation } from "@apollo/react-hooks";
import dayjs from "dayjs";
import gql from "graphql-tag";
import { useState } from "react";
import { Alert } from "react-native";
import { useNavigate } from "react-router-native";
import { useAppContext } from "../../../appProvider";
import { printDate } from "../../../utils/printDate";
import withGraphqlErrorHandler from "../../../utils/withGraphqlErrorHandler";

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
  const {
    state: { user, apolloClient },
  } = useAppContext();
  const [saveScheduleMutation, { loading: loadingMutation }] = useMutation(
    SAVE_SCHEDULE,
    {
      client: apolloClient,
    }
  );
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
      .set("second", 0)
      .set("milliseconds", 0);

    printDate(scheduleDate);

    const payload = {
      schedule: {
        userId: user.id,
        haircutId: haircut.id,
        scheduleDate,
      },
    };

    await saveScheduleMutation({ variables: payload });

    Alert.alert("Cita agendada exitosamente");

    navigate(-1);
  });

  return {
    haircut,
    setHaircut,
    date,
    setDate,
    selectedScheduleDate,
    setSelectedScheduleDate,
    onSubmit,

    loadingMutation,
  };
}
