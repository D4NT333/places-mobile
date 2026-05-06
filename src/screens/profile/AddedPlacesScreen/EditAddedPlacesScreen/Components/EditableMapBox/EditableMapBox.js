import React from "react";
import { Pressable, Text, View } from "react-native";

import styles from "./styles";

export default function EditableMapBox({
  label,
  newLabel,
  mapLabel,
  newMapLabel,
  reviewField,
  helperText,
  isEditing = false,
  onPressEdit,
}) {
  const needsReview = Boolean(reviewField?.selected);

  if (isEditing) {
    return (
      <View style={styles.container}>
        <Text style={styles.compareLabel}>{label}</Text>

        <View style={[styles.mapBox, needsReview && styles.mapBoxReview]}>
          <Text style={styles.mapText}>{mapLabel}</Text>
        </View>

        {!!helperText && (
          <Text style={[styles.helperText, needsReview && styles.helperReview]}>
            {helperText}
          </Text>
        )}

        <Text style={[styles.compareLabel, styles.newMapLabel]}>
          {newLabel || "Mapa nuevo"}
        </Text>

        <View style={[styles.mapBox, needsReview && styles.mapBoxReview]}>
          <Text style={styles.mapText}>{newMapLabel || mapLabel}</Text>
        </View>

        <Text style={[styles.helperText, needsReview && styles.helperReview]}>
          Texto
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.labelRow}>
        <Text style={styles.label}>{label}</Text>

        {needsReview && (
          <Pressable onPress={onPressEdit} hitSlop={8}>
            <Text style={styles.editText}>Editar</Text>
          </Pressable>
        )}
      </View>

      <View style={[styles.mapBox, needsReview && styles.mapBoxReview]}>
        <Text style={styles.mapText}>{mapLabel}</Text>
      </View>

      {!!helperText && (
        <Text style={[styles.helperText, needsReview && styles.helperReview]}>
          {helperText}
        </Text>
      )}
    </View>
  );
}