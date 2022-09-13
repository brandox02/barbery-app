import gql from "graphql-tag";
import React, { useState } from "react";
import { View } from "react-native";
import { useAppContext } from "../../appProvider";
import { usePopulate } from "../../hooks/usePopulate";
import Card from "./Card";

const GET_SCHEDULES = gql`
  query Schedules($where: ScheduleWhereInput) {
    schedules(where: $where) {
      id
      userId

      haircut {
        id
        duration
        name
      }
      scheduleDate
    }
  }
`;

export default function SchedulesList({ where, hideUserLabel }) {
  const [schedules, setSchedules] = useState([]);
  usePopulate({
    graphqlQuery: GET_SCHEDULES,
    onPopulate: async ({ schedules }) => {
      setSchedules(schedules);
    },
    variables: { where },
  });
  const [{ user }] = useAppContext();

  return (
    <View>
      {schedules.map((schedule) => (
        <Card
          key={schedule.id}
          schedule={schedule}
          user={hideUserLabel ? null : user}
        />
      ))}
    </View>
  );
}
