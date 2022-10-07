import React, { useMemo } from "react";
import { Pressable, Text, View } from "react-native";
import { generateAvailableScheduleDates } from "../../pages/schedules/management/generateIntervals";
import formatTime from "../../utils/formatTime";
import { generateRandomId } from "../../utils/generateRandomId";

export default function AvalibleDates({
  unAvaibleSchedules,
  duration,
  onSelectSchedule,
  selectedSchedule,
}) {
  const avalibleTimes = useMemo(
    () =>
      generateAvailableScheduleDates({
        duration,
        unAvaibleSchedules,
      }),
    [duration, unAvaibleSchedules]
  );

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
      <Text style={{ fontSize: 17 }}>Horarios Disponibles</Text>
      {avalibleTimes.map(({ start, end }, i) => {
        return (
          true && (
            <AvalibleDateItem
              key={generateRandomId()}
              start={start}
              end={end}
            />
          )
        );
      })}
    </View>
  );
}
