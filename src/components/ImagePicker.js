import * as ImagePickerFromExpo from "expo-image-picker";
import { Button, Image, View } from "react-native";

export default function ImagePicker({ setImage, image }) {
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePickerFromExpo.launchImageLibraryAsync({
      mediaTypes: ImagePickerFromExpo.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    if (!result.cancelled) {
      setImage(`data:image/jpg;base64,${result.base64}`);
    }
  };
 
  return (
    <View
      style={{ alignItems: "center", justifyContent: "center", margin: 10 }}
    >
      {image && (
        <Image
          source={{ uri: image }}
          style={{ width: 200, height: 200, borderRadius: 10 }}
        />
      )}
      {!image && <Image source={require("../../assets/image.png")} />}
      <Button
        style={{ marginTop: 20 }}
        title={image ? "Cargar otra Imagen" : "Cargar Imagen"}
        onPress={pickImage}
      />
    </View>
  );
}
