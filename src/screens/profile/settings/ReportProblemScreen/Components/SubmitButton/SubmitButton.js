import React from "react";
import { Pressable, Text } from "react-native";

import styles from "./styles";

export default function SubmitButton({ title = "Enviar", onPress, disabled }) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.button,
        disabled && styles.buttonDisabled,
        pressed && !disabled && styles.buttonPressed,
      ]}
    >
      <Text style={[styles.text, disabled && styles.textDisabled]}>
        {title}
      </Text>
    </Pressable>
  );
}