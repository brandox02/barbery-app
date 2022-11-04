import { StatusBar } from "expo-status-bar";
import React from "react";
import { Image, StyleSheet, View, Text, Button } from "react-native";
import Spinner from "react-native-loading-spinner-overlay/lib";
import { RHFInput } from "../../components/RHFTextInput";
import useLogIn from "./useLogIn";
import Constants from "expo-constants";

export default function LogIn() {
  const { control, onSubmit, goToSignIn, isLoading } = useLogIn();
  return (
    <View style={styles.container}>
      <Spinner visible={isLoading} />
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          // borderWidth: 1,
        }}
      >
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
      <View
        style={{ position: "absolute", top: 5 + Constants.statusBarHeight }}
      >
        <Text
          style={{
            backgroundColor: "purple",
            color: "white",
            paddingVertical: 5,
            paddingHorizontal: 30,
            borderRadius: 5,
          }}
        >
          Powered By Brandox02
        </Text>
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
  },
  logo: {
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
    // borderTopWidth: 0.3,
    borderTopColor: "grey",
    flexDirection: "row",
    justifyContent: "space-around",
  },
});
