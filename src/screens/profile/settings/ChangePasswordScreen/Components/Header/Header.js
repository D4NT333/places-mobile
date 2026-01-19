import React from "react";
import { View, Text, Pressable } from "react-native";
import styles from "./styles";

export default function Header({ title = "", onBack = () => {} }) {
  return (
    <View style={styles.header}>
      <Pressable onPress={onBack} style={styles.backBtn} hitSlop={10}>
        <Text style={styles.backIcon}>←</Text>
      </Pressable>

      <Text style={styles.title}>{title}</Text>

      {/* Spacer para centrar el título */}
      <View style={{ width: 36 }} />
    </View>
  );
}

const headerStyles = styles;
