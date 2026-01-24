import React from "react";
import { Pressable, Text, View } from "react-native";
import styles from "./styles";

export default function GoogleButton({ onPress, label = "Continuar con Google" }) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.btn, pressed && styles.pressed]}>
      <View style={styles.iconCircle}>
        <Text style={styles.icon}>G</Text>
      </View>
      <Text style={styles.text}>{label}</Text>
    </Pressable>
  );
}
