import React, { useMemo } from "react";
import { View, Text, TextInput } from "react-native";
import styles from "./styles";

export default function ProblemMessageBox({ value, onChange, minChars = 20, maxChars = 500 }) {
  const count = value.length;

  const hint = useMemo(() => `Mínimo ${minChars} caracteres`, [minChars]);
  const counter = useMemo(() => `${count}/${maxChars}`, [count, maxChars]);

  return (
    <View>
      <View style={styles.box}>
        <TextInput
          value={value}
          onChangeText={(t) => onChange(t.slice(0, maxChars))}
          placeholder="PlaceHolder"
          placeholderTextColor="#999"
          multiline
          textAlignVertical="top"
          style={styles.input}
        />
      </View>

      <View style={styles.metaRow}>
        <Text style={styles.hint}>{hint}</Text>
        <Text style={styles.counter}>{counter}</Text>
      </View>
    </View>
  );
}
