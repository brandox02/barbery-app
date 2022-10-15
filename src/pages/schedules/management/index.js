import React from "react";
import { Button, ScrollView, Text, View } from "react-native";
import HeaderModal from "../../../components/HeaderModal";
import useManagement from "./useManagement";
import HaircutPicker from "../../../components/HaircutPicker";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { Divider } from "react-native-paper";
import AvalibleDates from "./accesories/AvalibleDates";
import dayjs from "dayjs";

export default function ScheduleManagement() {
  const {
    haircut,
    setHaircut,
    date,
    setDate,
    selectedScheduleDate,
    setSelectedScheduleDate,
    onSubmit,

    loading,
  } = useManagement();

  return (
    <View>
      <HeaderModal
        title={"Agenda de Cita"}
        right={<Button title="Agendar" onPress={onSubmit} />}
      />
      <View>
        <View style={{ width: "100%" }}>
          <HaircutPicker haircut={haircut} setHaircut={setHaircut} />
          <Divider style={{ marginVertical: 20 }} />
          <View>
            {haircut && (
              <View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 10,
                  }}
                >
                  <Text style={{ fontSize: 17, marginTop: 10 }}>
                    Fecha de la Cita:
                  </Text>

                  <Text style={{ fontSize: 16 }}>
                    {date.format("DD/MM/YYYY")}
                  </Text>
                </View>

                <Button
                  title="Seleccionar Fecha"
                  onPress={() =>
                    DateTimePickerAndroid.open({
                      minimumDate: dayjs().toDate(),
                      locale: "es-ES",
                      value: date.toDate(),
                      onChange: (_, x) => {
                        setDate(dayjs(x));
                      },
                    })
                  }
                />
              </View>
            )}
            <ScrollView>
              {haircut && date && (
                <AvalibleDates
                  duration={haircut.duration}
                  loading={loading}
                  onSelectSchedule={setSelectedScheduleDate}
                  selectedSchedule={selectedScheduleDate}
                  date={date}
                />
              )}
            </ScrollView>
          </View>
        </View>
      </View>
    </View>
  );
}
