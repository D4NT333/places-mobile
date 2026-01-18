import React from "react";
import { Pressable, Text } from "react-native";
import styles from "./styles";

export default function SettingRow({ label, onPress, danger = false, last = false }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.row,
        last && styles.rowLast,
        pressed && styles.rowPressed,
      ]}
    >
      <Text style={[styles.rowText, danger && styles.rowTextDanger]}>{label}</Text>
      {!danger ? <Text style={styles.chevron}>›</Text> : null}
    </Pressable>
  );
}
