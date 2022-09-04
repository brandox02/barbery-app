import * as React from "react";
import { Button, Text, View } from "react-native";
import Card from "./card";
import HeaderPage from "../../../components/HeaderPage";
import useHaircut from "./useHaircut";
import Spinner from "../../../components/Spinner";

export default function Haircut() {
  const { haircuts, goToCreate, goToUpdate, loading } = useHaircut();

  return (
    <>
      <HeaderPage title={"Cortes de Pelo"} />
      <Spinner visible={loading} />
      <View
        style={{
          flexDirection: "column",
          justifyContent: "space-between",
          position: "relative",
          alignItems: "flex-end",
        }}
      >
        <Button title="Nuevo Corte" onPress={goToCreate} />
      </View>
      <View style={{}}>
        {/* <AutoScrollView scrollEnabled style={{}}> */}
        {haircuts.length ? (
          haircuts.map(({ image, name, price, duration, id }) => (
            <Card
              key={id}
              duration={duration}
              image={image}
              price={price}
              title={name}
              onEdit={() => goToUpdate(id)}
              onDelete={() => {}}
            />
          ))
        ) : (
          <View style={{ alignItems: "center" }}>
            <Text>{"No hay ningun corte de pelo para mostrar"}</Text>
          </View>
        )}
        {/* </AutoScrollView> */}
      </View>
    </>
  );
}
