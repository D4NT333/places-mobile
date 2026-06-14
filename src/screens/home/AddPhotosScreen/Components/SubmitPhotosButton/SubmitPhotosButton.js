import React from "react";
import {
  ActivityIndicator,
  Pressable,
  Text,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import styles from "./styles";

export default function SubmitPhotosButton({
  disabled,
  loading,
  onPress,
}) {
  const buttonDisabled = disabled || loading;

  return (
    <Pressable
      disabled={buttonDisabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        buttonDisabled && styles.buttonDisabled,
        pressed && !buttonDisabled && styles.buttonPressed,
      ]}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color="#FFFFFF"
        />
      ) : (
        <>
          <Text style={styles.text}>
            Enviar fotografías
          </Text>
        </>
      )}
    </Pressable>
  );
}