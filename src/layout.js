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
import { useLocation, useNavigate } from "react-router-native";
import menuItems from "./menuItems";

export const Layout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <ScrollView showsVerticalScrollIndicator={false}>{children}</ScrollView>
      </View>
      <View style={styles.menuContainer}>
        {menuItems.map(({ img, label, id, to }) => {
          const custromStyles = { ...styles.menuItem };

          if (location.pathname.includes(to)) {
            custromStyles.borderTopWidth = 3;
            custromStyles.borderTopColor = "purple";
          }

          return (
            <Pressable key={id} onPress={() => navigate(to)}>
              <View style={custromStyles}>
                <Image source={img} style={{ height: 30, width: 30 }} />
                <Text style={{ fontSize: 11 }}>{label}</Text>
              </View>
            </Pressable>
          );
        })}
      </View>
      <StatusBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F9FAFB",
    height: "100%",
  },
  contentContainer: {
    top: Constants.statusBarHeight,
    width: Dimensions.get("window").width,
    position: "relative",
    height: Dimensions.get("window").height - (75 + Constants.statusBarHeight),
    borderColor: "red",
    paddingHorizontal: 20,
  },
  menuItem: {
    alignItems: "center",
    padding: 10,
  },
  menuContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderTopWidth: 0.5,
    backgroundColor: "#f7f9fa",
    borderColor: "#d9d9d9",
    top: 40,
    bottom: Platform.OS === "android" ? Constants.statusBarHeight * -1 : 0,
  },
});
