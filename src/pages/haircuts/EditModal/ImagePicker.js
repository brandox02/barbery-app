import * as ImagePickerFromExpo from "expo-image-picker";
import { useEffect, useState } from "react";
import { Button, Image, View } from "react-native";

export default function ImagePicker({ updateImage }) {
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePickerFromExpo.launchImageLibraryAsync({
      mediaTypes: ImagePickerFromExpo.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  // load the image in father component
  useEffect(() => {
    if (image) {
      updateImage(image);
    }
  }, [image]);

  return (
    <View style={{ alignItems: "center", justifyContent: "center" }}>
      {image && (
        <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
      )}
      <Button
        style={{ marginTop: 20 }}
        title={image ? "Cargar otra Imagen" : "Cargar Imagen"}
        onPress={pickImage}
      />
    </View>
  );
}
