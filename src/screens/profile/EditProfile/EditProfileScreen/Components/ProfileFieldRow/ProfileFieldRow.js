import React from "react";
import { View, Text, Pressable } from "react-native";
import styles from "./styles";

export default function ProfileFieldRow({ label, value, onPress, multiline }) {
  return (
    <Pressable onPress={onPress} style={[styles.wrap, multiline && styles.wrapMultiline]}>
      <Text style={styles.label}>{label}</Text>

      <View style={[styles.field, multiline && styles.fieldMultiline]}>
        <Text
          numberOfLines={multiline ? 6 : 1}
          style={[styles.value, !value && styles.valueEmpty]}
        >
          {value || "Texto"}
        </Text>
      </View>
    </Pressable>
  );
}
