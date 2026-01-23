import React from "react";
import { View, Text, Pressable } from "react-native";
import styles from "./styles";

export default function Header({ title, onBack }) {
  return (
    <View style={styles.wrap}>
      <Pressable onPress={onBack} hitSlop={10} style={styles.backBtn}>
        <Text style={styles.backIcon}>←</Text>
      </Pressable>

      <Text style={styles.title}>{title}</Text>

      <View style={{ width: 34 }} />
    </View>
  );
}
