import { timeToUnix } from "../../utils/timeToUnix";

export const ADD_WORK_INTERVAL = "ADD_WORK_INTERVAL";
export const DELETE_WORK_INTERVAL = "DELETE_WORK_INTERVAL";
export const RESET_WORK_INTERVAL = "RESET_WORK_INTERVAL";
export const ON_CHANGE_TIME_INPUT = "ON_CHANGE_TIME_INPUT";
export const ON_CHANGE_DAY_SELECTED = "ON_CHANGE_DAY_SELECTED";
export const ON_CHANGE_VISIBLE = "ON_CHANGE_VISIBLE";

export const initialState = {
  items: [],
  dateEndInput: timeToUnix("00:00:00"),
  dateStartInput: timeToUnix("00:00:00"),
  dayId: null,
  visible: false,
};

export function reducer(state, { type, payload }) {
  const newState = { ...state };

  switch (type) {
    case ADD_WORK_INTERVAL: {
      const { value, dayId } = payload;
      newState.items = state.items.map((x) =>
        x.id === dayId
          ? {
              ...x,
              workIntervals: [...x.workIntervals, value],
            }
          : x
      );

      // saveWorkScheduleDayMutation({
      //   variables: {
      //     workScheduleDay: {
      //       id: dayId,
      //       workIntervals: newState.items
      //         .find((x) => x.id === dayId)
      //         .workIntervals.map((x) => pick(x, ["start", "end"])),
      //     },
      //   },
      // });
      break;
    }
    case DELETE_WORK_INTERVAL: {
      const { dayId, workIntervalId } = payload;
      newState.items = state.items.map((item) =>
        item.id == dayId
          ? {
              ...item,
              workIntervals: item.workIntervals.filter(
                (x) => x.id !== workIntervalId
              ),
            }
          : item
      );
      break;
    }
    case RESET_WORK_INTERVAL: {
      const { value } = payload;
      newState.items = value;
      break;
    }
    case ON_CHANGE_TIME_INPUT: {
      const { isStart, value } = payload;
      newState[isStart ? "dateStartInput" : "dateEndInput"] = value;
      break;
    }
    case ON_CHANGE_DAY_SELECTED: {
      const { value } = payload;
      newState["dayId"] = value;
      break;
    }
    case ON_CHANGE_VISIBLE: {
      const { value } = payload;
      newState["visible"] = value;
      break;
    }
  }
  return newState;
}
