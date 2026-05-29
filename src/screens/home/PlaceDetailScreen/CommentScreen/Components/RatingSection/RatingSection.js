import React from "react";
import { Text, View } from "react-native";
import styles from "./styles";

import RatingStarsPicker from "../../../../../../components/RatingStarsPicker";

const RATING_LABELS = {
  0.5: "Muy malo",
  1: "Muy malo",
  1.5: "Malo",
  2: "Malo",
  2.5: "Regular",
  3: "Regular",
  3.5: "Bueno",
  4: "Bueno",
  4.5: "Excelente",
  5: "Excelente",
};

export default function RatingSection({ value, onSelect }) {
  const label = RATING_LABELS[value] ?? "Selecciona una calificación";

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Califica el lugar</Text>

      <RatingStarsPicker
        value={value}
        onChange={onSelect}
        size={48}
        gap={14}
      />

      <View style={styles.labelsRow}>
        <Text style={styles.scaleLabel}>Muy malo</Text>
        <Text style={styles.scaleLabel}>Malo</Text>
        <Text style={styles.scaleLabel}>Regular</Text>
        <Text style={styles.scaleLabel}>Bueno</Text>
        <Text style={styles.scaleLabel}>Excelente</Text>
      </View>

      {value > 0 ? (
        <Text style={styles.selectedText}>
          {value.toFixed(1)} / 5 · {label}
        </Text>
      ) : null}
    </View>
  );
}