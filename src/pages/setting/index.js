import React from "react";
import { Button, Text, View } from "react-native";
import HeaderPage from "../../components/HeaderPage";
import useSetting from "./useSetting";

export default function Settings() {
  const { logout, goToUpdateProfilePage } = useSetting();
  const items = [
    {
      id: 1,
      label: "Cuenta",
      right: <Button title={"Cerrar Sesión"} onPress={logout} />,
    },
    {
      id: 2,
      label: "Información Personal",
      right: <Button title={"Actualizar"} onPress={goToUpdateProfilePage} />,
    },
  ];
  return (
    <View>
      <HeaderPage title={"Configuración"} />
      <View style={{ marginTop: 10 }}>
        {items.map(({ label, right, id }) => (
          <View
            key={id}
            style={{
              marginVertical: 10,
              justifyContent: "space-between",
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "white",
              padding: 10,
              borderRadius: 10,
            }}
          >
            <Text style={{ fontSize: 16 }}>{label}</Text>
            {right}
          </View>
        ))}
      </View>
    </View>
  );
}
