import React from "react";
import { View, Text } from "react-native";
import styles from "./styles";

export default function Divider({ text = "o continuar con" }) {
  return (
    <View style={styles.row}>
      <View style={styles.line} />
      <Text style={styles.text}>{text}</Text>
      <View style={styles.line} />
    </View>
  );
}
