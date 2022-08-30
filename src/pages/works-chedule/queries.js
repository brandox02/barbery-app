import gql from "graphql-tag";

export const GET_WORK_SCHEDULES = gql`
  query WorkScheduleDays {
    workScheduleDays {
      day
      end
      start
      id
      nonWorkIntervals {
        id
        start
        end
        workScheduleDayId
      }
    }
  }
`;

export const SAVE_WORK_SCHEDULE_DAYS = gql`
  mutation SaveWorkScheduleDays(
    $workScheduleDay: [WorkScheduleDayInput!]!
  ) {
    saveWorkScheduleDays(workScheduleDay: $workScheduleDay) {
      id
      day
      start
      end
      nonWorkIntervals {
        id
        start
        end
      }
    }
  }
`;
