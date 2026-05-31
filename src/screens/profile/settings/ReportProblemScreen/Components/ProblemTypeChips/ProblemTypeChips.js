import React from "react";
import { View, Text, Pressable } from "react-native";

import styles from "./styles";

export default function ProblemTypeChips({
  options = [],
  value,
  onChange,
  size = "medium",
}) {
  return (
    <View style={styles.container}>
      {options.map((item) => {
        const selected = item.id === value;

        return (
          <Pressable
            key={item.id}
            onPress={() => onChange(item.id)}
            style={({ pressed }) => [
              styles.chip,
              size === "small" && styles.chipSmall,
              size === "medium" && styles.chipMedium,
              selected && styles.chipSelected,
              pressed && styles.chipPressed,
            ]}
          >
            <Text
              numberOfLines={2}
              adjustsFontSizeToFit
              style={[
                styles.chipText,
                size === "small" && styles.chipTextSmall,
                selected && styles.chipTextSelected,
              ]}
            >
              {item.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}