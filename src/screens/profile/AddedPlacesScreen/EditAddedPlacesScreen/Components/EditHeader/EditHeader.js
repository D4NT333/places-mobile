import React from "react";
import { Pressable, Text, View } from "react-native";

import styles from "./styles";

export default function EditHeader({ title, onClose }) {
  return (
    <View style={styles.header}>
      <Pressable onPress={onClose} style={styles.closeButton}>
        <Text style={styles.closeIcon}>x</Text>
      </Pressable>

      <Text style={styles.title}>{title}</Text>
    </View>
  );
}