import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import FormInputElement from "../../../components/FormInputElement";
import Spinner from "../../../components/Spinner";
import ImagePicker from "../../../components/ImagePicker";
import useManagement from "./useManagement";
import { Divider } from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";
import ModalHeader from "../../../components/HeaderModal";

export default function HaircutManagement() {
  const { handleSubmit, imageError, methods, isLoading } = useManagement();
  const updateImage = (img) => methods.setValue("image", img);

  return (
    <View style={styles.container}>
      <Spinner visible={isLoading} />
      <ModalHeader
        title={"Editar Corte de pelo"}
        right={<Button title="Guardar" onPress={handleSubmit} />}
      />
      <View style={{ marginTop: 20 }}>
        <FormInputElement
          name={"name"}
          placeholder={"Ingresa el nombre del corte"}
          label={"Nombre"}
          control={methods.control}
        />

        <FormInputElement
          name={"price"}
          placeholder={"Ingresa el precio"}
          label={"Precio"}
          control={methods.control}
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
        {"Imagen"}
      </Text>
      <ImagePicker setImage={updateImage} image={methods.watch("image")} />

      {imageError && (
        <View style={{ alignItems: "center" }}>
          <Text style={{ color: "red" }}>{"La imagen es requerida"}</Text>
        </View>
      )}
      <Divider />
      <Text
        style={{
          fontWeight: "400",
          fontSize: 17,
          marginBottom: 10,
          marginTop: 20,
        }}
      >
        {"Duración"}
      </Text>
      <DateTimePicker
        style={{ borderWidth: 0.3, borderColor: "grey" }}
        is24Hour
        value={new Date(methods.watch("duration"))}
        onChange={(e) => methods.setValue("duration", e.nativeEvent.timestamp)}
        mode={"countdown"}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // padding: 10,
    position: "relative",
  },
  textInput: {
    width: 200,
    height: 40,
    marginLeft: 10,
    marginTop: -10,
  },
});
