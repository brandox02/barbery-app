import React, { useEffect } from "react";
import { Alert, Button, ScrollView, Text, View } from "react-native";
import HeaderModal from "../../../components/HeaderModal";
import useManagement from "./useManagement";
import HaircutPicker from "../../../components/HaircutPicker";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { Divider } from "react-native-paper";
import AvalibleDates from "../../../components/AvalibleDates";
import dayjs from "dayjs";
import { Conditional } from "../../../components/ConditionalComponents";

export default function ScheduleManagement() {
  const {
    haircut,
    setHaircut,
    date,
    setDate,
    selectedScheduleDate,
    setSelectedScheduleDate,
    onSubmit,
    busyDates,
    error,
    navigate,
  } = useManagement();

  useEffect(() => {
    if (error) {
      Alert.alert("Ha ocurrido un error inesperado");
      const timeoutId = setTimeout(() => {
        navigate(-1);
      }, 1000);
      return () => {
        clearTimeout(timeoutId);
      };
    }
  });

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
                  <Conditional>
                    <Conditional.If condition={!!date}>
                      <Text style={{ fontSize: 16 }}>
                        {date.format("DD/MM/YYYY")}
                      </Text>
                    </Conditional.If>
                  </Conditional>
                </View>

                <Button
                  title="Seleccionar Fecha"
                  onPress={() =>
                    DateTimePickerAndroid.open({
                      minimumDate: dayjs().toDate(),
                      locale: "es-ES",
                      value: date.toDate(),
                      onChange: (_, x) => setDate(dayjs(x)),
                    })
                  }
                />
              </View>
            )}
            <ScrollView>
              {haircut && date && (
                <AvalibleDates
                  duration={haircut.duration}
                  unAvaibleSchedules={busyDates}
                  onSelectSchedule={setSelectedScheduleDate}
                  selectedSchedule={selectedScheduleDate}
                />
              )}
            </ScrollView>
          </View>
        </View>
      </View>
    </View>
  );
}
