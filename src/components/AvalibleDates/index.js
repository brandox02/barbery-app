import React, { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { generateAvailableScheduleDates } from "../../pages/schedules/management/generateIntervals";
import { random } from "lodash";
import { generateRandomId } from "../../utils/generateRandomId";

export default function AvalibleDates({
  unAvaibleSchedules,
  duration,
  onSelectSchedule,
  selectedSchedule,
}) {
  const [avalibleTimes] = useState(
    generateAvailableScheduleDates({
      duration,
      unAvaibleSchedules,
    })
  );
  function AvalibleDateItem({ start, end }) {
    const isSelected =
      selectedSchedule.start.isSame(start) && selectedSchedule.end.isSame(end);

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
          <Text style={{ color: "white" }}>{`${start.format(
            "HH:mm"
          )} - ${end.format("HH:mm")}`}</Text>
        </View>
      </Pressable>
    );
  }

  return (
    <View style={{ marginTop: 30 }}>
      <Text style={{ fontSize: 17 }}>Horarios Disponibles</Text>
      {avalibleTimes.map(({ start, end }) => (
        <AvalibleDateItem key={generateRandomId()} start={start} end={end} />
      ))}
    </View>
  );
}
