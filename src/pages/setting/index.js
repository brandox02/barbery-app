import React from "react";
import { Button, Text, View } from "react-native";
import HeaderPage from "../../components/HeaderPage";
import useSetting from "./useSetting";

export default function Settings({ setToken }) {
  const { logout } = useSetting({ setToken });
  return (
    <View>
      <HeaderPage text={"Configuración"} />
      <View
        style={{
          margin: 20,
          justifyContent: "space-between",
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "white",
          padding: 10,
          borderRadius: 10,
        }}
      >
        <Text style={{ fontSize: 16 }}>{"Cuenta"}</Text>
        <Button title={"Cerrar Sesión"} onPress={logout} />
      </View>
    </View>
  );
}
