import React from "react";
import { Pressable, Text, View } from "react-native";
import styles from "./styles";

const LABELS = ["Muy malo", "Malo", "Regular", "Bueno", "Excelente"];

export default function RatingSection({ value, onSelect }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Califica el lugar</Text>

      <View
        style={styles.starsRow}
        accessible
        accessibilityLabel={`Calificación actual: ${value} de 5 estrellas`}
      >
        {LABELS.map((label, index) => {
          const starValue = index + 1;
          const isSelected = starValue <= value;

          return (
            <Pressable
              key={label}
              onPress={() => onSelect(starValue)}
              style={styles.starItem}
              accessibilityRole="button"
              accessibilityLabel={`${label}, ${starValue} de 5 estrellas`}
              accessibilityHint="Toca para seleccionar esta calificación"
            >
              <Text style={[styles.star, isSelected && styles.starSelected]}>
                ★
              </Text>
              <Text style={styles.starLabel}>{label}</Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}