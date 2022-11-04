import React from "react";
import { Button, View } from "react-native";
import Spinner from "react-native-loading-spinner-overlay/lib";
import FormInputElement from "../../../components/FormInputElement";
import HeaderModal from "../../../components/HeaderModal";
import ImagePicker from "../../../components/ImagePicker";
import useUpdateProfile from "./useUpdateProfile";

export default function UpdateProfile() {
  const { methods, onUpdateProfile, loading } = useUpdateProfile();
  return (
    <View>
      <HeaderModal
        title={"Actualizar Pefil"}
        right={<Button title={"Actualizar"} onPress={onUpdateProfile} />}
      />
      <Spinner visible={loading} />
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
          name={"phoneNumber"}
          label={"Número Celular"}
          placeholder={"Ingresa el número celular"}
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
          image={methods.watch("imageUrl")}
          setImage={(image) => methods.setValue("imageUrl", image)}
        />
      </View>
    </View>
  );
}
