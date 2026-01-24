import React from "react";
import { Pressable, Text, View } from "react-native";
import styles from "./styles";

export default function ModalHeader({ title, onClose }) {
  return (
    <View style={styles.row}>
      <Pressable onPress={onClose} style={({ pressed }) => [styles.closeBtn, pressed && styles.pressed]}>
        <Text style={styles.closeText}>x</Text>
      </Pressable>

      <Text style={styles.title}>{title}</Text>
      <View style={{ width: 36 }} />
    </View>
  );
}
