import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { useNavigate } from "react-router-native";


export default function HeaderModal({ title, right, goToBack }) {
  const navigate = useNavigate();
  const _goToBack = () => navigate(-1);
  return (
    <View style={styles.topContainer}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Pressable onPress={goToBack || _goToBack}>
          <Image
            source={require("../../assets/back-icon.png")}
            style={{ width: 40, height: 40, marginLeft: -10 }}
          />
        </Pressable>
        <Text style={styles.title}>{title}</Text>
      </View>
      <View>{right}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  topContainer: {
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    // borderBottomWidth: 1,
    // borderWidth: 1,
    borderBottomWidth: 0.2,
    borderBottomColor: "grey",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",

    marginLeft: 10,
  },
});
