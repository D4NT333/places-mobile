import React from "react";
import { Pressable, Text, View } from "react-native";

import styles from "./styles";

export default function EditableMapBox({
  label,
  mapLabel,
  helperText,
  onPress,
}) {
  return (
    <View style={styles.section}>
      <Text style={styles.label}>{label}</Text>

      <Pressable style={styles.mapBox} onPress={onPress}>
        <Text style={styles.mapText}>{mapLabel}</Text>
      </Pressable>

      {helperText ? (
        <Text style={styles.helperText}>{helperText}</Text>
      ) : null}
    </View>
  );
}