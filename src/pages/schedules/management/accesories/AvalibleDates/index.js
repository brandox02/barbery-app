import React from "react";
import { Pressable, Text, View } from "react-native";
import formatTime from "../../../../../utils/formatTime";
import { generateRandomId } from "../../../../../utils/generateRandomId";
import { usePopulate } from "../../../../../hooks/usePopulate";
import Spinner from "../../../../../components/Spinner";
import gql from "graphql-tag";
import dayjs from "dayjs";

const GET_AVALIBLE_INTERVALS = gql`
  query GetAvalibleIntervals($date: DateTime!, $duration: String!) {
    getAvalibleIntervals(date: $date, duration: $duration) {
      end
      start
    }
  }
`;

export default function AvalibleDates({
  duration,
  onSelectSchedule,
  selectedSchedule,
  date,
}) {
  const { data, loading } = usePopulate({
    graphqlQuery: GET_AVALIBLE_INTERVALS,
    variables: { date: date.toDate(), duration },
  });

  const avalibleTimes = (data?.getAvalibleIntervals || []).map((item) => ({
    start: dayjs(item.start),
    end: dayjs(item.end),
  }));

  function AvalibleDateItem({ start, end }) {
    const isSelected =
      selectedSchedule.start &&
      selectedSchedule.end &&
      selectedSchedule.start.isSame(start) &&
      selectedSchedule.end.isSame(end);

    const onPress = () => {
      onSelectSchedule({ start, end });
    };

    return (
      <Pressable onPress={onPress}>
        <View
          style={{
            borderRadius: 5,
            marginVertical: 10,
            padding: 10,
            backgroundColor: isSelected ? "#6495ED" : "green",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "white" }}>{`${formatTime(
            start
          )} - ${formatTime(end)}`}</Text>
        </View>
      </Pressable>
    );
  }

  return (
    <View style={{ marginTop: 30 }}>
      <Spinner visible={loading} />
      <Text style={{ fontSize: 17 }}>Horarios Disponibles</Text>
      {loading ? (
        <Text style={{ marginTop: 10 }}>{"Cargando..."}</Text>
      ) : (
        avalibleTimes.map(({ start, end }, i) => (
          <AvalibleDateItem key={generateRandomId()} start={start} end={end} />
        ))
      )}
    </View>
  );
}
