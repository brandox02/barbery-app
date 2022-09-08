import React from "react";
import { Button, ScrollView, Text, View } from "react-native";
import HeaderModal from "../../../components/HeaderModal";
import useManagement from "./useManagement";
import HaircutPicker from "../../../components/HaircutPicker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Divider } from "react-native-paper";
import AvalibleDates from "../../../components/AvalibleDates";
import dayjs from "dayjs";
import { getHeightByPercent } from "../../../utils/getHeightByPercent";

export default function ScheduleManagement() {
  const {
    haircutId,
    setHaircutId,
    date,
    setDate,
    selectedScheduleDate,
    setScheduleDate,
  } = useManagement();

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
            <ScrollView>
              <AvalibleDates
                duration={"01:00:00"}
                unAvaibleSchedules={[
                  {
                    start: "00:00:00",
                    end: "12:00:00",
                    type: "non-work",
                  },
                  {
                    start: "17:45:00",
                    end: "18:30:00",
                    type: "non-work",
                  },
                ]}
                onSelectSchedule={setScheduleDate}
                selectedSchedule={selectedScheduleDate}
              />
            </ScrollView>
          </View>
        </View>
      </View>
    </View>
  );
}
