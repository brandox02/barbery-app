import dayjs from "dayjs";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import NumberFormat from "react-number-format";
import { useAppContext } from "../../../../appProvider";
import { timeToUnix } from "../../../../utils/timeToUnix";
import CardMenu from "./Menu";
export default function Card({
  image,
  title,
  price,
  duration,
  onEdit,
  onDelete,
}) {
  const [{ user }] = useAppContext();
  return (
    <View style={styles.container}>
      <View
        style={{
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <Text style={{ ...styles.title , paddingVertical: 15}}>{title}</Text>
        {user?.isAdmin && <CardMenu onDelete={onDelete} onEdit={onEdit} />}
      </View>

      <View style={styles.card}>
        <Image
          source={
            image
              ? { uri: image }
              : require("../../../../../assets/haircut-1.webp")
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
              source={require("../../../../../assets/price-icon.png")}
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
              source={require("../../../../../assets/duration-icon.jpg")}
              style={{ width: 35, height: 35, marginLeft: 4 }}
            />
            <Text style={styles.duration}>
              {dayjs(timeToUnix(duration)).format("HH:mm")}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    // margin: 20,
    backgroundColor: "white",
    marginTop: 15,
    // border styles
    borderWidth: 0.2,
    borderColor: "grey",
  },
  card: {
    position: "relative",
    // justifyContent: "center",
    display: "flex",
    // borderWidth: 1,

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
