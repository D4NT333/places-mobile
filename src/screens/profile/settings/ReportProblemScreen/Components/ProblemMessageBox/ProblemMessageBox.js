import React from "react";
import { View, Text, TextInput } from "react-native";

import styles from "./styles";

export default function ProblemMessageBox({
  value,
  onChange,
  minChars = 20,
  maxChars = 500,
  placeholder = "Describe brevemente qué ocurrió...",
}) {
  const currentLength = value.length;
  const isValid = value.trim().length >= minChars;

  return (
    <View style={styles.container}>
      <TextInput
  value={value}
  onChangeText={(text) => {
    if (text.length <= maxChars) {
      onChange(text);
    }
  }}
  placeholder={placeholder}
  placeholderTextColor="#9A9A9A"
  multiline
  textAlignVertical="top"
  maxLength={maxChars}
  blurOnSubmit={false}
  scrollEnabled
  style={styles.input}
/>

      <View style={styles.footer}>
        <Text style={[styles.helperText, isValid && styles.helperTextValid]}>
          Mínimo {minChars} caracteres
        </Text>

        <Text style={styles.counter}>
          {currentLength}/{maxChars}
        </Text>
      </View>
    </View>
  );
}