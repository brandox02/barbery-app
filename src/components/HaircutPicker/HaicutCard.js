import dayjs from "dayjs";
import React from "react";
import { Button, Image, StyleSheet, Text, View } from "react-native";
import NumberFormat from "react-number-format";

export default function HaircutCard({
  image,
  title,
  price,
  duration,
  onSelectHaircut,
}) {
  return (
    <View style={styles.container}>
      <View
        style={{
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <Text style={styles.title}>{title}</Text>
      </View>

      <View style={styles.card}>
        <Image
          source={
            image ? { uri: image } : require("../../../assets/haircut-1.webp")
          }
          style={styles.image}
        />
        <View
          style={{
            marginTop: 10,
            alignItems: "center",
            flexDirection: "column",
            width: "100%",
          }}
        >
          <View
            style={{
              flexDirection: "row",
            }}
          >
            <Image
              source={require("../../../assets/price-icon.png")}
              style={{ width: 50, height: 50 }}
            />
            <NumberFormat
              displayType={"text"}
              prefix={"RD$"}
              suffix={".00"}
              thousandSeparator
              renderText={(value) => <Text style={styles.price}>{value}</Text>}
              value={price}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
            }}
          >
            <Image
              source={require("../../../assets/duration-icon.jpg")}
              style={{ width: 35, height: 35, marginLeft: 4 }}
            />
            <Text style={styles.duration}>
              {dayjs(`2001-01-01 ${duration}`).format("HH:mm")}
            </Text>
          </View>
        </View>
      </View>
      <View style={{ marginTop: 20 }}>
        <Button title="Seleccionar" onPress={onSelectHaircut} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    // margin: 20,
    backgroundColor: "white",
    margin: 15,
    // border styles
    borderWidth: 0.2,
    borderColor: "grey",
  },
  card: {
    position: "relative",
    display: "flex",
    alignItems: "center",
  },
  image: {
    width: 300,
    height: 300,
    borderRadius: 10,
  },
  title: {
    marginTop: -12,
    fontSize: 20,
    fontWeight: "500",
    padding: 20,
  },
  price: {
    marginTop: 15,

    marginLeft: 2,
    fontSize: 16,
  },
  duration: {
    marginTop: 10,

    marginLeft: 10,
    fontSize: 16,
  },
});
