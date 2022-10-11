import React from "react";
import { Button, Image, Modal, ScrollView, Text, View } from "react-native";
import { useState } from "react";
import Constants from "expo-constants";
import { HAIRCUTS_QUERY } from "../../pages/haircut/list/useHaircut";
import { usePopulate } from "../../hooks/usePopulate";
import HaircutCard from "./HaicutCard";
import dayjs from "dayjs";
import { timeToUnix } from "../../utils/timeToUnix";
import Spinner from "../../components/Spinner";
import NumberFormat from "react-number-format";

function Card({ haircut }) {
  if (!haircut) {
    return <></>;
  }
  const { name, price, imageUrl, duration } = haircut;
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 20,
        marginTop: 20,
        backgroundColor: "white",
        borderRadius: 10,
        borderWidth: 0.2,
        borderColor: "grey",
      }}
    >
      <View style={{ justifyContent: "space-around", width: "75%" }}>
        <Text style={{ fontWeight: "600", fontSize: 16 }}>{name}</Text>
        <NumberFormat
          displayType={"text"}
          prefix={"RD$"}
          suffix={".00"}
          thousandSeparator
          renderText={(value) => <Text>{value}</Text>}
          value={price}
        />
        <Text style={{ fontWeight: "200" }}>
          {`Duración de ${dayjs(timeToUnix(duration)).format("HH:mm")}`}
        </Text>
      </View>
      <View style={{ width: "25%" }}>
        <Image
          source={
            imageUrl
              ? { uri: imageUrl }
              : require("../../../assets/haircut-1.webp")
          }
          style={{ height: 70, width: 70, borderRadius: 10 }}
        />
      </View>
    </View>
  );
}
export default function HaircutPicker({ haircut, setHaircut }) {
  const [haircuts, setHaircuts] = useState([]);
  const [visible, setVisible] = useState(false);
  const { loading } = usePopulate({
    graphqlQuery: HAIRCUTS_QUERY,
    variables: {},
    onPopulate: async (data) => {
      setHaircuts(data.haircuts);
    },
  });
  return (
    <View>
      <Spinner visible={loading} />
      <Text style={{ fontSize: 16, marginTop: 20 }}>
        {"Selecciona el Corte de Pelo:"}
      </Text>
      <Card haircut={haircut} />
      <View style={{ alignItems: "flex-end" }}>
        <Button
          title={haircut ? "Seleccionar Otro" : "Seleccionar"}
          onPress={() => setVisible(true)}
        />
      </View>
      <Modal visible={visible} transparent={false} animationType="slide">
        <View style={{ marginTop: Constants.statusBarHeight }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              margin: 20,
            }}
          >
            Selector de Cortes de Pelo
          </Text>
          <ScrollView style={{ marginBottom: 120 }}>
            {haircuts.map((haircut) => {
              const { imageUrl, name, price, duration, id } = haircut;
              return (
                <View key={id}>
                  <HaircutCard
                    key={id}
                    duration={duration}
                    image={imageUrl}
                    price={price}
                    title={name}
                    onSelectHaircut={() => {
                      setHaircut(haircut);
                      setVisible(false);
                    }}
                  />
                </View>
              );
            })}
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
}
