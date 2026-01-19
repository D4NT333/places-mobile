import React from "react";
import { Pressable, Text } from "react-native";
import styles from "./styles";

export default function PrimaryButton({ title, onPress }) {
  return (
    <Pressable onPress={onPress} style={styles.btn}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}
