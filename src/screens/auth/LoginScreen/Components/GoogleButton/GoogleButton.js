import React from "react";
import { Pressable, Text, ActivityIndicator, Image } from "react-native";
import styles from "./styles";
import { icons } from "../.././../../../../assets/icons";

export default function GoogleButton({
  onPress,
  disabled = false,
  loading = false,
}) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      style={({ pressed }) => [
        styles.btn,
        pressed && !disabled && !loading ? styles.pressed : null,
        disabled || loading ? styles.disabled : null,
      ]}
    >
      {loading ? (
        <ActivityIndicator />
      ) : (
        <>
         <Image source={icons.google} style={styles.icon} />
          <Text style={styles.text}>Continuar con Google</Text>
        </>
      )}
    </Pressable>
  );
}