import React from "react";
import { Modal, View } from "react-native";
import HeaderModal from "../../../../components/HeaderModal";
import Constants from "expo-constants";
import SchedulesList from "../../../../components/SchedulesList";
import dayjs from "dayjs";

export default function DetailScheduleModal({
  visible,
  setVisible,
  datesSelected,
}) {
  return (
    <Modal visible={visible} transparent={false} animationType="slide">
      <View style={{ marginTop: Constants.statusBarHeight }}>
        <HeaderModal
          title={"Detalles de Citas"}
          goToBack={() => setVisible(false)}
        />
        <View style={{ margin: 20 }}>
          <SchedulesList
            showCancelButton
            where={{
              dates: datesSelected.map((x) => {
                const date = dayjs(x);
                date.set("hours", 0);
                date.set("minutes", 0);
                date.set("seconds", 0);
                date.set("milliseconds", 0);
                return date.toDate();
              }),
            }}
          />
        </View>
      </View>
    </Modal>
  );
}
