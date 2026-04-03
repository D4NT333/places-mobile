import React from "react";
import { View, Text, Pressable } from "react-native";
import styles from "./styles";

export default function PhotoPicker() {
  return (
    <View style={styles.box}>
      <Text style={styles.title}>Fotos</Text>
      <Text style={styles.subtitle}>Placeholder (luego metemos image picker)</Text>

      <Pressable style={styles.btn} onPress={() => console.log("Pick photos (placeholder)")}>
        <Text style={styles.btnText}>Elegir fotos</Text>
      </Pressable>
    </View>
  );
}
