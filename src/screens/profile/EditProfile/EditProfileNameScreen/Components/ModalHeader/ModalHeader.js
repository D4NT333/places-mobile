import React from "react";
import { View, Text, Pressable } from "react-native";
import styles from "./styles";

export default function ModalHeader({ title, onClose, onSave }) {
  return (
    <View style={styles.wrap}>
      <Pressable onPress={onClose} hitSlop={10} style={styles.iconBtn}>
        <Text style={styles.icon}>×</Text>
      </Pressable>

      <Text style={styles.title}>{title}</Text>

      <Pressable onPress={onSave} hitSlop={10} style={styles.iconBtn}>
        <Text style={styles.icon}>✓</Text>
      </Pressable>
    </View>
  );
}
