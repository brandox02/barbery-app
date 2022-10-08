import React, { useEffect } from "react";
import { Alert, Button, ScrollView, Text, View } from "react-native";
import HeaderModal from "../../../components/HeaderModal";
import useManagement from "./useManagement";
import HaircutPicker from "../../../components/HaircutPicker";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { Divider } from "react-native-paper";
import AvalibleDates from "../../../components/AvalibleDates";
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
                <Text style={{ fontSize: 17, marginTop: 10 }}>
                  Fecha de la Cita:
                </Text>

                <Button
                  title="Seleccionar Fecha"
                  onPress={() =>
                    DateTimePickerAndroid.open({
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
