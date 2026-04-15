import React from "react";
import { Pressable, Text, View } from "react-native";
import styles from "./styles";

const OPTIONS = [
  { value: 1, label: "Muy\ninsatisfecho" },
  { value: 2, label: "Insatisfecho" },
  { value: 3, label: "Neutral" },
  { value: 4, label: "Satisfecho" },
  { value: 5, label: "Totalmente\nsatisfecho" },
];

export default function LikertQuestionSection({
  title,
  value,
  onSelect,
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>

      <View style={styles.optionsRow}>
        {OPTIONS.map((option) => {
          const isSelected = option.value === value;

          return (
            <Pressable
              key={option.value}
              onPress={() => onSelect(option.value)}
              style={styles.optionItem}
              accessibilityRole="button"
              accessibilityLabel={`${title}, opción ${option.value}`}
              accessibilityHint={`Selecciona ${option.label.replace("\n", " ")}`}
              accessibilityState={{ selected: isSelected }}
            >
              <View
                style={[
                  styles.dot,
                  isSelected && styles.dotSelected,
                ]}
              />

              <Text style={styles.optionLabel}>{option.label}</Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}