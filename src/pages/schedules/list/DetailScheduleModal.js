import React from "react";
import { Image, Modal, Text, View } from "react-native";
import HeaderModal from "../../../components/HeaderModal";
import Constants from "expo-constants";

function Card() {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 20,
        margin: 20,
        backgroundColor: "#F9FAFB",
        borderRadius: 10,
        borderWidth: 0.2,
        borderColor: "grey",
      }}
    >
      <View style={{ justifyContent: "space-around" }}>
        <Text style={{ fontWeight: "600", fontSize: 16 }}>
          {"10:00AM - 10:45AM"}
        </Text>
        <Text>{"Dani Rojas"}</Text>
        <Text style={{ fontWeight: "200" }}>{"Corte de Pelo Casual"}</Text>
      </View>
      <View>
        <Image
          source={require("../../../../assets/haircut-1.webp")}
          style={{ height: 70, width: 70, borderRadius: 10 }}
        />
      </View>
    </View>
  );
}

export default function DetailScheduleModal({ visible, setVisible }) {
  return (
    <Modal visible={visible} transparent={false} animationType="slide">
      <View style={{ marginTop: Constants.statusBarHeight }}>
        <HeaderModal
          title={"Detalles de Citas"}
          goToBack={() => setVisible(false)}
        />
        <Card />
      </View>
    </Modal>
  );
}
