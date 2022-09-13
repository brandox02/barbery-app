import React from "react";
import { Image, Text, TextInput, View } from "react-native";
import { Divider } from "react-native-paper";
import { RHFInput } from "./RHFTextInput";

export default function FormInputElement({
  name,
  control,
  label,
  placeholder = "",
  image = require("../../assets/form-icon.png"),
  editable = true,
  type = "default" ,
}) {
  return (
    <View style={{ display: "flex", flexDirection: "row" }}>
      <RHFInput
        control={control}
        name={name}
        style={{
          width: 200,
          height: 40,
          marginLeft: 10,
          marginTop: -10,
        }}
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
              <Image source={image} style={{ width: 30, height: 30 }} />
              <TextInput
                {...props}
                style={{ padding: 20, fontSize: 16 }}
                placeholder={placeholder}
                editable={editable}
                keyboardType={type}
              />
            </View>
            <View>
              <Divider />
            </View>
          </View>
        )}
      />
    </View>
  );
}
