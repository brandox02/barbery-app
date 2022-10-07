import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import FormInputElement from "../../../components/FormInputElement";
import Spinner from "../../../components/Spinner";
import ImagePicker from "../../../components/ImagePicker";
import useManagement from "./useManagement";
import { Divider } from "react-native-paper";
import ModalHeader from "../../../components/HeaderModal";
import DurationPicker from "../../../components/DurationPicker";

export default function HaircutManagement() {
  const { handleSubmit, imageError, methods, isLoading, haircutId } =
    useManagement();
  const updateImage = (img) => methods.setValue("image", img);

  return (
    <View style={styles.container}>
      <Spinner visible={isLoading} />
      <ModalHeader
        title={`${haircutId ? "Editar" : "Nuevo"} Corte de pelo`}
        right={<Button title="Guardar" onPress={handleSubmit} />}
      />

      <View style={{ marginTop: 20 }}>
        <FormInputElement
          name={"name"}
          placeholder={"Ingresa el nombre del corte"}
          label={"Nombre:"}
          control={methods.control}
        />

        <FormInputElement
          name={"price"}
          placeholder={"Ingresa el precio"}
          label={"Precio:"}
          control={methods.control}
          type={"numeric"}
        />
      </View>

      <Text
        style={{
          fontWeight: "400",
          fontSize: 17,
          marginBottom: 10,
          marginTop: 10,
        }}
      >
        {"Imagen:"}
      </Text>
      <ImagePicker setImage={updateImage} image={methods.watch("image")} />

      {imageError && (
        <View style={{ alignItems: "center" }}>
          <Text style={{ color: "red" }}>{"La imagen es requerida"}</Text>
        </View>
      )}

      <Divider />

      <DurationPicker
        date={methods.watch("duration")}
        setDate={(date) => methods.setValue("duration", date)}
        label={
          <Text
            style={{
              fontWeight: "400",
              fontSize: 17,
              marginBottom: 10,
              marginTop: 20,
            }}
          >
            {"Duración:"}
          </Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
  },
  textInput: {
    width: 200,
    height: 40,
    marginLeft: 10,
    marginTop: -10,
  },
});
