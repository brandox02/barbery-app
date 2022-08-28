import { useController } from "react-hook-form";
import React from "react";
import { Text, TextInput, View } from "react-native";

export const RHFInput = ({
  name,
  control,
  defaultValue = "",
  validate = {},
  CustomTextInput = TextInput,
  required = true,
  ...restProps
}) => {
  const {
    field,
    formState: { errors },
  } = useController({
    control,
    defaultValue,
    name,
    rules: {
      ...(required
        ? {
            required: {
              value: true,
              message: "Este campo es requerido",
            },
          }
        : {}),
      validate,
    },
  });

  if (!control) throw new Error("No control provided");
  else if (!name) throw new Error("No input name provided");

  return (
    <View style={{ display: "flex", flexDirection: "column" }}>
      <CustomTextInput
        {...restProps}
        value={field.value}
        onChangeText={field.onChange}
      />
      {errors[name] && (
        <Text style={{ color: "red", fontSize: 12 }}>
          {errors[name]["message"]}
        </Text>
      )}
    </View>
  );
};
