import React from "react";
import { Text, TextInput, View } from "react-native";

import styles from "./styles";

export default function EditableTextField({
  label,
  value,
  onChangeText,
  placeholder,
  helperText,
  multiline = false,
}) {
  return (
    <View style={styles.section}>
      <Text style={styles.label}>{label}</Text>

      <TextInput
        value={value}
        onChangeText={onChangeText}
        style={[styles.input, multiline ? styles.multilineInput : null]}
        placeholder={placeholder}
        placeholderTextColor="#9ca3af"
        multiline={multiline}
      />

      {helperText ? <Text style={styles.helperText}>{helperText}</Text> : null}
    </View>
  );
}