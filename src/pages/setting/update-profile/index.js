import React from "react";
import { Button, View, Text } from "react-native";
import FormInputElement from "../../../components/FormInputElement";
import HeaderModal from "../../../components/HeaderModal";
import ImagePicker from "../../../components/ImagePicker";
import useUpdateProfile from "./useUpdateProfile";

export default function UpdateProfile({ setToken }) {
  const { methods, onUpdateProfile } = useUpdateProfile({ setToken });
  return (
    <View>
      <HeaderModal
        title={"Actualizar Pefil"}
        right={<Button title={"Actualizar"} onPress={onUpdateProfile} />}
      />
      <View>
        <FormInputElement
          control={methods.control}
          name={"firstname"}
          label={"Primer Nombre"}
          placeholder={"Ingresa el primer nombre"}
          editable={true}
        />
        <FormInputElement
          control={methods.control}
          name={"lastname"}
          label={"Segundo Nombre"}
          placeholder={"Ingresa el segundo nombre"}
          editable={true}
        />

        <FormInputElement
          control={methods.control}
          name={"username"}
          label={"Username"}
          placeholder={"Ingresa el usuario"}
          editable={false}
        />
        <FormInputElement
          control={methods.control}
          name={"email"}
          label={"Email"}
          placeholder={"Ingresa el email"}
          editable={false}
        />
        <ImagePicker
          image={methods.watch("image")}
          setImage={(image) => methods.setValue("image", image)}
        />
      </View>
    </View>
  );
}
