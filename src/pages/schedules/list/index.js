import React from "react";
import { View } from "react-native";
import { useAppContext } from "../../../appProvider";
import AdminList from "./admin";
import UserList from "./user";

export default function List() {
  const {
    state: { user },
  } = useAppContext();
  return <View>{user.isAdmin ? <AdminList /> : <UserList user={user} />}</View>;
}
