import React from "react";
import { Text, View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import addTime from "../utils/addTime";
import dayjs from "dayjs";

const generateInterval = ({ step = 1, limit }) =>
  [...Array(limit / step)].map((_, i) => i * step);

export default function DurationPicker({
  date,
  setDate,
  label = "Selecciona la duración:",
  hourConfig = {
    label: "Hora:",
    limit: 13,
    step: 1,
  },
  minuteConfig = {
    label: "Minuto:",
    limit: 60,
    step: 5,
  },
}) {
  function handleValueChange(type) {
    return (value) => {
      const newDate = dayjs(date).set(type, parseInt(value));
      setDate(newDate);
    };
  }

  return (
    <View>
      <Text style={{ fontSize: 16 }}>{label}</Text>
      <View style={{ flexDirection: "row", marginTop: 10 }}>
        <View style={{ width: "50%" }}>
          <Text>{hourConfig.label}</Text>
          <Picker
            onValueChange={handleValueChange("hours")}
            selectedValue={dayjs(date).get("hours").toString()}
          >
            {generateInterval({
              limit: hourConfig.limit,
              step: hourConfig.step,
            }).map((f) => (
              <Picker.Item
                key={Math.random() * 10000}
                label={f.toString()}
                value={f.toString()}
              />
            ))}
          </Picker>
        </View>
        <View style={{ width: "50%" }}>
          <Text>{minuteConfig.label}</Text>
          <Picker
            onValueChange={handleValueChange("minutes")}
            selectedValue={dayjs(date).get("minutes").toString()}
          >
            {generateInterval({
              limit: minuteConfig.limit,
              step: minuteConfig.step,
            }).map((f) => (
              <Picker.Item
                key={Math.random() * 10000}
                label={f.toString()}
                value={f.toString()}
              />
            ))}
          </Picker>
        </View>
      </View>
    </View>
  );
}
