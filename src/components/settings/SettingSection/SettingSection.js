import React from "react";
import { View, Text } from "react-native";
import styles from "./styles";

export default function SettingSection({ title, children }) {
  return (
    <View style={styles.section}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.card}>{children}</View>
    </View>
  );
}
