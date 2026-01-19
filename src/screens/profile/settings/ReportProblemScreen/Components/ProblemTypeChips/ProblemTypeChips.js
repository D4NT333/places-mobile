import React from "react";
import { View, Text, Pressable } from "react-native";
import styles from "./styles";

export default function ProblemTypeChips({ options, value, onChange }) {
  return (
    <View style={styles.row}>
      {options.map((opt) => {
        const selected = opt.id === value;

        return (
          <Pressable
            key={opt.id}
            onPress={() => onChange(opt.id)}
            style={[styles.chip, selected && styles.chipSelected]}
          >
            <Text style={[styles.chipText, selected && styles.chipTextSelected]}>
              {opt.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
