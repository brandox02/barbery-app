import React from "react";
import { Button, View } from "react-native";
import { Divider } from "react-native-paper";
import HeaderPage from "../../../../components/HeaderPage";
import SchedulesList from "../../../../components/SchedulesList";
import useUserList from "./useUserList";

export default function UserList({ user }) {
  const { goToManagement } = useUserList({ user });

  return (
    <View style={{}}>
      <HeaderPage title={"Mis Agendas"} />
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
      <SchedulesList
        where={{ userId: user.id }}
        hideUserLabel
        showCancelButton
      />
    </View>
  );
}
