import React from "react";
import { Pressable, Text, View } from "react-native";
import styles from "./styles";

const LABELS = ["Muy malo", "Malo", "Regular", "Bueno", "Excelente"];

export default function RatingSummaryCard({ value, onEdit }) {
  const safeValue = Math.max(0, Math.min(5, value));
  const label = safeValue > 0 ? LABELS[safeValue - 1] : "Sin calificación";

  return (
    <Pressable
      onPress={onEdit}
      style={styles.container}
      accessibilityRole="button"
      accessibilityLabel={`Calificación seleccionada: ${safeValue} de 5`}
      accessibilityHint="Toca para volver a editar la calificación"
    >
      <View style={styles.starsRow}>
        {[1, 2, 3, 4, 5].map((star) => {
          const isSelected = star <= safeValue;

          return (
            <Text
              key={star}
              style={[styles.star, isSelected && styles.starSelected]}
            >
              ★
            </Text>
          );
        })}
      </View>

      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
}