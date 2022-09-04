import React from "react";
import { Button, Text, View } from "react-native";
import HeaderModal from "../../../components/HeaderModal";
import useManagement from "./useManagement";
import HaircutPicker from "../../../components/HaircutPicker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Divider } from "react-native-paper";
export default function ScheduleManagement() {
  const { haircutId, setHaircutId, date, setDate } = useManagement();

  return (
    <View>
      <HeaderModal
        title={"Agenda de Cita"}
        right={<Button title="Agendar" />}
      />
      <View>
        <View style={{ width: "100%" }}>
          <HaircutPicker haircutId={haircutId} setHaircutId={setHaircutId} />
          <Divider style={{ marginVertical: 20 }} />
          <View>
            <Text style={{ fontSize: 17, marginTop: 10 }}>
              Fecha de la Cita
            </Text>
            <DateTimePicker
              mode="datetime"
              value={date}
              onChange={(_, x) => setDate(new Date(x))}
            />
          </View>
        </View>
      </View>
    </View>
  );
}
