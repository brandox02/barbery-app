import { StatusBar } from "expo-status-bar";
import React from "react";
import { Image, StyleSheet, View, Text, Button } from "react-native";
import { RHFInput } from "../../components/RHFTextInput";
import useLogIn from "./useLogIn";

export default function LogIn({ setToken }) {
  const { control, onSubmit, goToSignIn } = useLogIn({ setToken });
  return (
    <View style={styles.container}>
      <View>
        <Image
          style={styles.logo}
          source={require("../../../assets/logo.jpg")}
        />
      </View>
      <View>
        <Text style={styles.title}>Iniciar Sesión</Text>

        <View style={styles.linealForm}>
          <Text>Username:</Text>
          <RHFInput
            control={control}
            name={"username"}
            style={styles.textInput}
            placeholder={"Ingresa nombre de usuario"}
          />
        </View>
        <View style={styles.linealForm}>
          <Text>Contraseña:</Text>
          <RHFInput
            control={control}
            name={"password"}
            style={styles.textInput}
            placeholder={"Ingresa la contraseña"}
          />
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          color={"grey"}
          title={"Ir a Registrarme"}
          onPress={goToSignIn}
        />
        <Button title={"Iniciar Sesión"} onPress={onSubmit} />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    width: "80%"
  },
  logo: {
    marginLeft: -30,
    width: 300,
    height: 150,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 20,
  },
  textInput: {
    width: 200,
    height: 40,
    marginLeft: 10,
    marginTop: -10,
  },
  linealForm: {
    marginVertical: 10,
    display: "flex",
    flexDirection: "row",
  },
  buttonContainer: {
    marginTop: 10,
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
  },
});
