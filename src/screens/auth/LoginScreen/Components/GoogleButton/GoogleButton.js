import React from "react";
import { Pressable, Text, View, Image } from "react-native";
import styles from "./styles";
import { icons } from "../../../../../../assets/icons";

export default function GoogleButton({ onPress }) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.btn, pressed && styles.pressed]}>
      <View style={styles.iconCircle}>
        <Image
          source={icons.google}
          style={styles.icon}
        />
      </View>
      <Text style={styles.text}>Iniciar sesión con Google</Text>
    </Pressable>
  );
}
