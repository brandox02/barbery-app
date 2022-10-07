import dayjs from "dayjs";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import NumberFormat from "react-number-format";
import { MissingPropError } from "../utils/MissingPropError";
import { timeToUnix } from "../utils/timeToUnix";

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "white",
    marginTop: 15,
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

function CardHeader({ title, right = false, children }) {
  if (children) return children;
  if (!title) {
    throw new MissingPropError({
      componentName: CardHeader.name,
      propName: "title",
    });
  }

  return (
    <View
      style={{
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
      }}
    >
      <Text style={{ ...styles.title, paddingVertical: 15 }}>{title}</Text>
      {right && right}
    </View>
  );
}
function CardImage({ image, children }) {
  if (children) {
    return children;
  }
  if (!image) {
    throw new MissingPropError({
      componentName: CardImage.name,
      propName: "image",
    });
  }
  return (
    <Image
      source={image ? { uri: image } : require("../../assets/haircut-1.webp")}
      style={styles.image}
    />
  );
}

function CardDetail({ price, duration, children }) {
  if (children) {
    return children;
  }

  if (!price) {
    throw new MissingPropError({
      componentName: CardDetail.name,
      propName: "price",
    });
  } else if (!duration) {
    throw new MissingPropError({
      componentName: CardDetail.name,
      propName: "duration",
    });
  }
  return (
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
          source={require("../../assets/price-icon.png")}
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
          source={require("../../assets/duration-icon.jpg")}
          style={{ width: 35, height: 35, marginLeft: 4 }}
        />
        <Text style={styles.duration}>
          {dayjs(timeToUnix(duration)).format("HH:mm")}
        </Text>
      </View>
    </View>
  );
}

function Card({ children }) {
  if (
    !Array.isArray(children) ||
    !children.every((x) =>
      [CardDetail.name, CardImage.name, CardHeader.name].includes(x.type.name)
    )
  ) {
    throw new Error("You must to pass all card children components");
  }

  const CardHeaderComp = children.find((x) => x.type.name === CardHeader.name);
  const CardImageComp = children.find((x) => x.type.name === CardImage.name);
  const CardDetailComp = children.find((x) => x.type.name === CardDetail.name);
  return (
    <View style={styles.container}>
      {CardHeaderComp}
      <View style={styles.card}>
        {CardImageComp}
        {CardDetailComp}
      </View>
    </View>
  );
}

Card.CardDetail = CardDetail;
Card.CardHeader = CardHeader;
Card.CardImage = CardImage;
export default Card;
