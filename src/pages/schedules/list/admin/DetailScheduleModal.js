import React from "react";
import { Modal, View } from "react-native";
import HeaderModal from "../../../../components/HeaderModal";
import Constants from "expo-constants";
import SchedulesList from "../../../../components/SchedulesList";

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
            where={{ dates: datesSelected.map((x) => `${x} 00:00:00`) }}
          />
        </View>
      </View>
    </Modal>
  );
}
