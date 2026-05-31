import React from "react";
import { View, Text, Pressable } from "react-native";

import styles from "./styles";

export default function CheckRow({ checked, onToggle, label }) {
  return (
    <Pressable onPress={onToggle} style={styles.container}>
      <View style={[styles.box, checked && styles.boxChecked]}>
        {checked && <Text style={styles.check}>✓</Text>}
      </View>

      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
}