import React from "react";
import { Pressable, Text, View } from "react-native";
import styles from "./styles";

export default function Header({ title, onBack }) {
  return (
    <View style={styles.container}>
      <Pressable onPress={onBack} style={styles.backBtn}>
        <Text style={styles.backIcon}>‹</Text>
      </Pressable>

      <Text style={styles.title}>{title}</Text>

      {/* Spacer para centrar el título */}
      <View style={{ width: 36 }} />
    </View>
  );
}
