import React from "react";
import { Pressable, Text, View } from "react-native";
import styles from "./styles";

export default function RecommendSection({
  question,
  value,
  summaryType = "neutral",
  onSelect,
  onEdit,
}) {
  const isAnswered = value !== null;

  if (isAnswered) {
    const isPositive = value === true;
    const summaryStyles = [
      styles.summaryCard,
      isPositive ? styles.summaryPositive : styles.summaryNegative,
    ];

    return (
      <Pressable
        onPress={onEdit}
        style={summaryStyles}
        accessibilityRole="button"
        accessibilityLabel={`Respuesta seleccionada: ${
          isPositive ? "Sí" : "No"
        }`}
        accessibilityHint="Toca para cambiar tu respuesta"
      >
        <Text style={styles.summaryQuestion}>{question}</Text>
        <Text style={styles.summaryAnswer}>{isPositive ? "Sí" : "No"}</Text>
      </Pressable>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.question}>{question}</Text>

      <View style={styles.optionsRow}>
        <Pressable
          onPress={() => onSelect(false)}
          style={styles.optionButton}
          accessibilityRole="button"
          accessibilityLabel="Responder no"
          accessibilityHint="Marca que no"
        >
          <Text style={styles.optionText}>No</Text>
        </Pressable>

        <Pressable
          onPress={() => onSelect(true)}
          style={styles.optionButton}
          accessibilityRole="button"
          accessibilityLabel="Responder sí"
          accessibilityHint="Marca que sí"
        >
          <Text style={styles.optionText}>Sí</Text>
        </Pressable>
      </View>
    </View>
  );
}