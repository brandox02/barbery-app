import React from "react";
import { Image, Pressable, View } from "react-native";
import { Menu, Divider } from "react-native-paper";
export default function CardMenu({ onEdit, onDelete }) {
  const [visible, setVisible] = React.useState(false);

  const surround =
    (fn) =>
    async (...args) => {
      await fn(...args);
      setVisible(false);
    };

  return (
    <View style={{ position: "relative" }}>
      <Menu
        visible={visible}
        onDismiss={() => setVisible(false)}
        anchor={
          <Pressable onPress={() => setVisible(true)}>
            <Image
              source={require("../../../../assets/menu.png")}
              style={{
                width: 40,
                height: 40,
                alignSelf: "flex-end",
                marginBottom: 10,
              }}
            />
          </Pressable>
        }
      >
        <Menu.Item
          icon={require("../../../../assets/edit-icon.png")}
          onPress={surround(onEdit)}
          title="Editar"
        />
        <Divider />
        <Menu.Item
          onPress={surround(onDelete)}
          title="Borrar"
          icon={require("../../../../assets/delete-icon.png")}
        />
      </Menu>
    </View>
  );
}
