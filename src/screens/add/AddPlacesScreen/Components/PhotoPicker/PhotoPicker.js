import React from "react";
import { View, Text, Pressable } from "react-native";
import styles from "./styles";
import { pickImages } from "../../../../../services";

export default function PhotoPicker() {

  const handlePickImages = async () => {
  try {
    const images = await pickImages();
    console.log("IMÁGENES:", images);
  } catch (error) {
    console.log("Error:", error.message);
  }
};

  return (
    <View style={styles.box}>
      <Text style={styles.title}>Fotos</Text>
      <Text style={styles.subtitle}>Selecciona hasta un maximo de 5 fotos</Text>

      <Pressable style={styles.btn} onPress={handlePickImages}>
        <Text style={styles.btnText}>Elegir fotos</Text>
      </Pressable>
    </View>
  );
}
