import { useMutation } from "@apollo/react-hooks";

import dayjs from "dayjs";
import { pick } from "lodash";
import { useReducer } from "react";

import { Alert } from "react-native";
import { useAppContext } from "../../appProvider";
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
  initialState,
  ON_CHANGE_DAY_SELECTED,
  ON_CHANGE_VISIBLE,
} from "./reducer";

export default function useWorkSchedule() {
  const [{ apolloClient }] = useAppContext();
  const [saveWorkScheduleDaysMutation, { loading }] = useMutation(
    SAVE_WORK_SCHEDULE_DAYS,
    { client: apolloClient }
  );
  const [{ items, dateEndInput, dateStartInput, dayId, visible }, dispatch] =
    useReducer(reducer, initialState);

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
    (date) => {
      dispatch({
        type: ON_CHANGE_TIME_INPUT,
        payload: { isStart, value: date },
      });
    };

  const toggleModal = () => {
    dispatch({ type: ON_CHANGE_VISIBLE, payload: { value: !visible } });
  };

  const onAddNonWorkInterval = () => {
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
    toggleModal();
  };

  const onDeleteWorkInterval =
    ({ dayId, nonWorkIntervalId }) =>
    () =>
      dispatch({
        type: DELETE_NON_WORK_INTERVAL,
        payload: { dayId, nonWorkIntervalId },
      });

  const onOpenModal = (dayId) => {
    dispatch({ type: ON_CHANGE_DAY_SELECTED, payload: { value: dayId } });
    toggleModal();
  };

  const onSave = withGraphqlErrorHandler(async () => {
    await saveWorkScheduleDaysMutation({
      variables: {
        workScheduleDays: items.map((item) => ({
          id: item.id,
          nonWorkIntervals: item.nonWorkIntervals.map((x) =>
            pick(x, ["start", "end"])
          ),
        })),
      },
    });

    Alert.alert("Horarios guardados correctamente");
  });

  return {
    items,
    dateEndInput,
    dateStartInput,
    onDateInput,
    onAddNonWorkInterval,
    onDeleteWorkInterval,
    onSave,
    isLoading: !populated || loading,
    onOpenModal,
    dayId,
    toggleModal,
    visible,
  };
}
