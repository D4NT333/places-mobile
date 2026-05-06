import React from "react";
import { Pressable, Text, View } from "react-native";

import styles from "./styles";

export default function EditHeader({ title, onClose }) {
  return (
    <View style={styles.header}>
      <Pressable onPress={onClose} hitSlop={12} style={styles.closeButton}>
        <Text style={styles.closeText}>x</Text>
      </Pressable>

      <Text style={styles.title}>{title}</Text>

      <View style={styles.fakeSpace} />
    </View>
  );
}