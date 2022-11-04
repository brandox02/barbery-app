import gql from "graphql-tag";

export const GET_WORK_SCHEDULES = gql`
  query WorkScheduleDays {
    workScheduleDays {
      day
      end
      start
      id
      workIntervals {
        id
        start
        end
        workScheduleDayId
      }
    }
  }
`;

export const SAVE_WORK_SCHEDULE_DAYS = gql`
  mutation SaveWorkScheduleDays($workScheduleDays: [WorkScheduleInput!]!) {
    saveWorkScheduleDays(workSchedule: $workScheduleDays) {
      id
      day
      start
      end
      workIntervals {
        id
        start
        end
      }
    }
  }
`;
