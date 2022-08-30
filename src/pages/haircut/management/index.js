import React from "react";
import {
  Button,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { RHFInput } from "../../../components/RHFTextInput";
import Spinner from "../../../components/Spinner";
import { Layout } from "../../../layout";
import ImagePicker from "./ImagePicker";
import useManagement from "./useManagement";
import { Divider } from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";
export default function HaircutManagement() {
  const { handleSubmit, imageError, methods, haircutId, goToBack, isLoading } =
    useManagement();
  const updateImage = (img) => methods.setValue("image", img);

  const Input = ({ name, placeholder, label }) => (
    <RHFInput
      control={methods.control}
      name={name}
      style={styles.textInput}
      CustomTextInput={(props) => (
        <View>
          <View>
            <Text
              style={{
                fontWeight: "400",
                fontSize: 17,
                marginBottom: 10,
                marginTop: 20,
              }}
            >
              {label}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image
              source={require("../../../../assets/form-icon.png")}
              style={{ width: 30, height: 30 }}
            />
            <TextInput
              {...props}
              style={{ padding: 20, fontSize: 16 }}
              placeholder={placeholder}
            />
          </View>
          <View>
            <Divider />
          </View>
        </View>
      )}
    />
  );

  return (
    <Layout hideMenu>
      <View style={styles.container}>
        <Spinner visible={isLoading} />
        <View style={styles.topContainer}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Pressable onPress={goToBack}>
              <Image
                source={require("../../../../assets/back-icon.png")}
                style={{ width: 40, height: 40, marginLeft: -10 }}
              />
            </Pressable>
            <Text style={styles.title}>{`${
              haircutId ? "Editar" : "Nuevo"
            } Corte de Pelo`}</Text>
          </View>
          <View style={styles.bottom}>
            <Button title="Guardar" onPress={handleSubmit} />
          </View>
        </View>
        <View style={{ marginTop: 20 }}>
          <View style={styles.linealForm}>
            <Input
              name={"name"}
              placeholder={"Ingresa el nombre del corte"}
              label={"Nombre"}
            />
          </View>
          <View style={styles.linealForm}>
            <Input
              name={"price"}
              placeholder={"Ingresa el precio"}
              label={"Precio"}
            />
          </View>
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
        <ImagePicker
          updateImage={updateImage}
          initialImage={methods.watch("image")}
        />

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
          onChange={(e) =>
            methods.setValue("duration", e.nativeEvent.timestamp)
          }
          mode={"countdown"}
        />
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    position: "relative",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",

    marginLeft: 10,
  },
  linealForm: {
    display: "flex",
    flexDirection: "row",
  },
  textInput: {
    width: 200,
    height: 40,
    marginLeft: 10,
    marginTop: -10,
  },
  topContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
