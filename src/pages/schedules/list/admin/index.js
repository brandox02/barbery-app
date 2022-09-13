import React from "react";
import { Button, Text, View, Modal } from "react-native";
import { CalendarList } from "react-native-calendars";
import HeaderPage from "../../../../components/HeaderPage";
import DetailScheduleModal from "./DetailScheduleModal";
import useScheduleList from "./useScheduleList";

export default function Schedules() {
  const { visible, setVisible, datesSelected, onSelectDate, goToManagement } =
    useScheduleList();

  const markedDates = datesSelected.reduce(
    (acc, curr) => ({
      ...acc,
      [curr]: { selected: true },
    }),
    {}
  );

  return (
    <View style={{}}>
      <DetailScheduleModal
        visible={visible}
        setVisible={setVisible}
        datesSelected={datesSelected}
      />

      <HeaderPage title={"Agendas"} />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-end",
          alignItems: "center",
          marginVertical: 5,
        }}
      >
        <Button title={"Agendar Cita"} onPress={goToManagement} />
      </View>
      <View>
        <Text style={{ fontSize: 17, marginBottom: 10 }}>
          Selecciona las fechas:
        </Text>
        <CalendarList
          contentContainerStyle={{
            justifyContent: "center",
            alignItems: "center",
          }}
          hideArrows={false}
          horizontal={true}
          markedDates={markedDates}
          onDayPress={onSelectDate}
          calendarHeight={100}
          calendarWidth={320}
          
        />
        <Button title="Mostrar citas" onPress={() => setVisible(true)} />
      </View>
    </View>
  );
}
