import * as React from "react";
import {
  Button,
  Image,
  Modal,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import Card from "./card";
import HeaderPage from "../../../components/HeaderPage";
import useHaircut from "./useHaircut";
import Spinner from "../../../components/Spinner";

export default function Haircut() {
  const { haircuts, goToCreate, goToUpdate, loading } = useHaircut();

  // if (loadingHaircuts) {
  //   return <Text>App loading...</Text>;
  // }

  // console.log({ haircuts, loadingHaircuts });

  return (
    <View style={{}}>
      <Spinner visible={loading} />
      <View
        style={{
          flexDirection: "column",
          width: "100%",
          justifyContent: "space-between",
          position: "relative",
        }}
      >
        <HeaderPage text="Cortes de pelo" />
        <View style={{ alignItems: "flex-end", paddingRight: 10 }}>
          <Button title="Nuevo Corte" onPress={goToCreate} />
        </View>
      </View>
      <ScrollView style={{ height: "100%" }}>
        {haircuts?.map(({ image, name, price, duration, id }) => (
          <Card
            key={id}
            duration={duration}
            image={image}
            price={price}
            title={name}
            onEdit={() => goToUpdate(id)}
            onDelete={() => {}}
          />
        ))}
      </ScrollView>
    </View>
  );
}