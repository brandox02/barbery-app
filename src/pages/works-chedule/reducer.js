

export const ADD_NON_WORK_INTERVAL = "ADD_NON_WORK_INTERVAL";
export const DELETE_NON_WORK_INTERVAL = "DELETE_NON_WORK_INTERVAL";
export const RESET_NON_WORK_INTERVAL = "RESET_NON_WORK_INTERVAL";
export const ON_CHANGE_TIME_INPUT = "ON_CHANGE_TIME_INPUT";

export const initialState = {
  items: [],
  dateEndInput: new Date(),
  dateStartInput: new Date(),
}

export function reducer(state, { type, payload }) {
  const newState = { ...state };

  switch (type) {
    case ADD_NON_WORK_INTERVAL: {
      const { value, dayId } = payload;
      newState.items = state.items.map((x) =>
        x.id === dayId
          ? {
              ...x,
              nonWorkIntervals: [...x.nonWorkIntervals, value],
            }
          : x
      );

      // saveWorkScheduleDayMutation({
      //   variables: {
      //     workScheduleDay: {
      //       id: dayId,
      //       nonWorkIntervals: newState.items
      //         .find((x) => x.id === dayId)
      //         .nonWorkIntervals.map((x) => pick(x, ["start", "end"])),
      //     },
      //   },
      // });
      break;
    }
    case DELETE_NON_WORK_INTERVAL: {
      const { dayId, nonWorkIntervalId } = payload;
      newState.items = state.items.map((item) =>
        item.id == dayId
          ? {
              ...item,
              nonWorkIntervals: item.nonWorkIntervals.filter(
                (x) => x.id !== nonWorkIntervalId
              ),
            }
          : item
      );
      break;
    }
    case RESET_NON_WORK_INTERVAL: {
      const { value } = payload;
      newState.items = value;
      break;
    }
    case ON_CHANGE_TIME_INPUT: {
      const { isStart, value } = payload;
      newState[isStart ? "dateStartInput" : "dateEndInput"] = value;
      break;
    }
  }
  return newState;
}


