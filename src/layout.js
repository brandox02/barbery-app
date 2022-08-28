import { StatusBar } from "expo-status-bar";
import {
  Dimensions,
  Image,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Constants from "expo-constants";
import React from "react";
import { useNavigate } from "react-router-native";

const menuItems = [
  {
    id: 2,
    img: require("../assets/favicon.png"),
    label: "Cortes De Pelo",
    to: "/haircuts",
  },
  {
    id: 3,
    img: require("../assets/favicon.png"),
    label: "Agendas",
    to: "/schedules",
  },
  {
    id: 4,
    img: require("../assets/favicon.png"),
    label: "Horarios",
    to: "/work-schedules",
  },
  {
    id: 5,
    img: require("../assets/favicon.png"),
    label: "Configuración",
    to: "/settings",
  },
];

export const Layout = ({ children, hideMenu }) => {
  const navigate = useNavigate();
  return (
    <View style={styles.container}>
      <ScrollView style={styles.contentContainer}>{children}</ScrollView>
      {!hideMenu && (
        <View style={styles.menuContainer}>
          {menuItems.map(({ img, label, id, to }) => (
            <Pressable key={id} onPress={() => navigate(to)}>
              <View style={styles.menuItem}>
                <Image source={img} style={{ height: 30, width: 30 }} onP />
                <Text>{label}</Text>
              </View>
            </Pressable>
          ))}
        </View>
      )}
      <StatusBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // alignItems: "center",
    // position: "relative",
    // height: Dimensions.get("window").height,
    backgroundColor: "#F9FAFB",
    height: "100%",
  },
  contentContainer: {
    top: Constants.statusBarHeight,
    marginBottom: Constants.statusBarHeight,
    width: Dimensions.get("window").width,
    position: "relative",
  },
  menuItem: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    marginBottom: Platform.OS === "ios" ? 15 : 0,
  },
  menuContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: Dimensions.get("window").width,
    borderWidth: 0.5,
    backgroundColor: "#f7f9fa",
    borderColor: "#d9d9d9",
    alignItems: "flex-end",
    bottom: Platform.OS === "android" ? Constants.statusBarHeight * -1 : 0,
  },
});
