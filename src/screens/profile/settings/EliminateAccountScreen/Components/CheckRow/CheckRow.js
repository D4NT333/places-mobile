import React from "react";
import { Pressable, Text, View } from "react-native";
import styles from "./styles";

export default function CheckRow({ checked, onToggle, label }) {
  return (
    <Pressable style={styles.row} onPress={onToggle} hitSlop={10}>
      <View style={[styles.box, checked && styles.boxChecked]}>
        {checked ? <Text style={styles.check}>✓</Text> : null}
      </View>
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
}
