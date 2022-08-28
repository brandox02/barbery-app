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
import HeaderPage from "../../components/HeaderPage";
import EditModal from "./EditModal";
import useHaircut from "./useHaircut";

export default function Haircut() {
  const {
    methods,
    setVisibleModalEdit,
    visibleModalEdit,
    haircuts,
    loadingHaircuts,
    goBack,
  } = useHaircut();

  // if (loadingHaircuts) {
  //   return <Text>App loading...</Text>;
  // }

  // console.log({ haircuts, loadingHaircuts });

  return (
    <View style={{}}>
      <EditModal
        setVisibleModalEdit={setVisibleModalEdit}
        visibleModalEdit={visibleModalEdit}
        control={methods.control}
        methods={methods}
      />
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
          <Button title="Nuevo Corte" />
        </View>
      </View>
      <ScrollView style={{ height: "100%" }}>
        {haircuts?.map(({ image, name, price, duration }) => (
          <Card
            key={Math.random()}
            duration={duration}
            img={require("../../../assets/haircut-1.webp")}
            price={price}
            title={name}
            onEdit={() => setVisibleModalEdit(true)}
            onDelete={() => {}}
          />
        ))}
      </ScrollView>
    </View>
  );
}
