import React from "react";
import { Pressable, Text, View } from "react-native";
import styles from "./styles";

export default function ModalHeader({ title, onBack }) {
  return (
    <View style={styles.row}>
      <Pressable onPress={onBack} style={({ pressed }) => [styles.backBtn, pressed && styles.pressed]}>
        <Text style={styles.backIcon}>‹</Text>
      </Pressable>

      <Text style={styles.title}>{title}</Text>

      <View style={{ width: 36 }} />
    </View>
  );
}
