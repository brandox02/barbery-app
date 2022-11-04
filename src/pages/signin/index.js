import { StatusBar } from "expo-status-bar";
import React from "react";
import { Image, StyleSheet, View, Text, Button } from "react-native";
import useSignIn from "./useSignIn";
import { getInputValidates } from "./getInputValidates";
import { RHFInput } from "../../components/RHFTextInput";
import Spinner from "react-native-loading-spinner-overlay/lib";
import Constants from "expo-constants";
export default function SignIn() {
  const { control, onSubmit, methods, goToLogin, isLoading } = useSignIn();
  return (
    <View style={styles.container}>
      <Spinner visible={isLoading} />
      <View>
        <Image
          style={styles.logo}
          source={require("../../../assets/logo.jpg")}
        />
      </View>
      <View>
        <Text style={styles.title}>Registrarte</Text>
        <View style={styles.linealForm}>
          <Text>Email:</Text>
          <RHFInput
            control={control}
            name={"email"}
            placeholder={"Ingresa tu dirección de correo"}
            style={styles.textInput}
            validate={getInputValidates(methods)("email")}
          />
        </View>
        <View style={styles.linealForm}>
          <Text>Nombres:</Text>
          <RHFInput
            control={control}
            name={"firstname"}
            style={styles.textInput}
            placeholder={"Ingresa tu nombres"}
          />
        </View>
        <View style={styles.linealForm}>
          <Text>Apellidos:</Text>
          <RHFInput
            control={control}
            name={"lastname"}
            style={styles.textInput}
            placeholder={"Ingresa tus apellidos"}
          />
        </View>
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
          <Text>Número Celular:</Text>
          <RHFInput
            control={control}
            name={"phoneNumber"}
            style={styles.textInput}
            placeholder={"Ingresa tu número de celular"}
          />
        </View>
        <View style={styles.linealForm}>
          <Text>Contraseña:</Text>
          <RHFInput
            control={control}
            name={"password"}
            style={styles.textInput}
            placeholder={"Ingresa la contraseña"}
            validate={getInputValidates(methods)("password")}
          />
        </View>
        <View style={styles.linealForm}>
          <Text>{"Repite \nla Contraseña"}:</Text>
          <RHFInput
            control={control}
            name={"password2"}
            style={styles.textInput}
            placeholder={"Ingresa la contraseña 2"}
            validate={getInputValidates(methods)("password2")}
          />
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          color={"grey"}
          title={"Ir a Iniciar Sesión"}
          onPress={goToLogin}
        />
        <Button title={"Registrarme"} onPress={onSubmit} />
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
    // width: "80%",
    // borderWidth: 1,
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
