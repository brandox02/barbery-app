import gql from "graphql-tag";
import React, { useState } from "react";
import { Text, View } from "react-native";
import { useAppContext } from "../../appProvider";
import { usePopulate } from "../../hooks/usePopulate";
import Card from "./Card";
import { Conditional } from "../ConditionalComponents/";

const GET_SCHEDULES = gql`
  query Schedules($where: ScheduleWhereInput) {
    schedules(where: $where) {
      id
      userId

      haircut {
        id
        duration
        name
        imageUrl
      }
      scheduleDate
    }
  }
`;

export default function SchedulesList({
  where,
  hideUserLabel,
  nonAppointmentAvaliblesLabel = "No hay citas agendadas",
}) {
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
      <Conditional>
        <Conditional.If condition={schedules.length}>
          {schedules.map((schedule) => (
            <Card
              key={schedule.id}
              schedule={schedule}
              user={hideUserLabel ? null : user}
            />
          ))}
        </Conditional.If>
        <Conditional.Else>
          <View style={{ alignItems: "center", marginTop: 20 }}>
            <Text>{nonAppointmentAvaliblesLabel}</Text>
          </View>
        </Conditional.Else>
      </Conditional>
    </View>
  );
}
