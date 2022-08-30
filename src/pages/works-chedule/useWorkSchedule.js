import { useMutation } from "@apollo/react-hooks";
import dayjs from "dayjs";
import { pick } from "lodash";
import { useEffect, useReducer } from "react";
import { Alert } from "react-native";
import { useNavigate } from "react-router-native";
import { usePopulate } from "../../hooks/usePopulate";
import { generateRandomId } from "../../utils/generateRandomId";
import withGraphqlErrorHandler from "../../utils/withGraphqlErrorHandler";
import { GET_WORK_SCHEDULES, SAVE_WORK_SCHEDULE_DAYS } from "./queries";
import {
  reducer,
  ADD_NON_WORK_INTERVAL,
  DELETE_NON_WORK_INTERVAL,
  ON_CHANGE_TIME_INPUT,
  RESET_NON_WORK_INTERVAL,
} from "./reducer";

export default function useWorkSchedule() {
  const [saveWorkScheduleDaysMutation] = useMutation(SAVE_WORK_SCHEDULE_DAYS);
  const [{ items, dateEndInput, dateStartInput }, dispatch] = useReducer(
    reducer,
    {
      items: [],
      dateEndInput: new Date(),
      dateStartInput: new Date(),
    }
  );

  const navigate = useNavigate();

  const { populated } = usePopulate({
    variables: {},
    graphqlQuery: GET_WORK_SCHEDULES,
    onPopulate: async (data) => {
      dispatch({
        type: RESET_NON_WORK_INTERVAL,
        payload: { value: data.workScheduleDays },
      });
    },
  });

  const onDateInput =
    ({ isStart }) =>
    (_, date) => {
      dispatch({
        type: ON_CHANGE_TIME_INPUT,
        payload: { isStart, value: date },
      });
    };

  const onAddNonWorkInterval = ({ dayId }) => {
    dispatch({
      type: ADD_NON_WORK_INTERVAL,
      payload: {
        value: {
          start: dayjs(dateStartInput).format("HH:mm:ss"),
          end: dayjs(dateEndInput).format("HH:mm:ss"),
          id: generateRandomId(),
        },
        dayId,
      },
    });
  };

  const onDeleteWorkInterval =
    ({ dayId, nonWorkIntervalId }) =>
    () =>
      dispatch({
        type: DELETE_NON_WORK_INTERVAL,
        payload: { dayId, nonWorkIntervalId },
      });

  const onSave = withGraphqlErrorHandler(async () => {
    console.log(
      JSON.stringify(
        items.map((item) => ({
          id: item.id,
          nonWorkIntervals: item.nonWorkIntervals.map((x) =>
            pick(x, ["start", "end"])
          ),
        }))
      )
    );
    await saveWorkScheduleDaysMutation({
      variables: {
        workScheduleDay: items.map((item) => ({
          id: item.id,
          nonWorkIntervals: item.nonWorkIntervals.map((x) =>
            pick(x, ["start", "end"])
          ),
        })),
      },
    });

    Alert.alert("Horarios guardados correctamente");
    setTimeout(() => navigate(-1), 700);
  });

  const members = {
    items,
    dateEndInput,
    dateStartInput,
    onDateInput,
    onAddNonWorkInterval,
    onDeleteWorkInterval,
    onSave,
  };

  return members;
}
