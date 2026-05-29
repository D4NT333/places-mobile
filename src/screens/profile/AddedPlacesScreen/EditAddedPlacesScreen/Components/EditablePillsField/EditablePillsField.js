import React from "react";
import { Pressable, Text, View } from "react-native";

import styles from "./styles";

export default function EditablePillsField({
  label,
  newLabel,
  pills = [],
  newPills = [],
  helperText,
  reviewField,
  onPressEdit,
  isEditing = false,
}) {
  const needsReview = Boolean(reviewField?.selected);
  const pillsToShow = newPills.length > 0 ? newPills : pills;
  const canEdit = needsReview && typeof onPressEdit === "function";

  if (isEditing) {
    return (
      <View style={styles.compareContainer}>
        <View style={styles.compareColumn}>
          <Text style={styles.compareLabel}>{label}</Text>

          <View style={styles.comparePillsColumn}>
            {pills.map((pill) => (
              <View
                key={`old-${pill}`}
                style={[styles.pill, needsReview && styles.pillReview]}
              >
                <Text style={styles.pillText}>{pill}</Text>
              </View>
            ))}
          </View>

          {!!helperText && (
            <Text style={[styles.helperText, needsReview && styles.helperReview]}>
              {helperText}
            </Text>
          )}
        </View>

        <View style={styles.divider} />

        <View style={styles.compareColumn}>
          <View style={styles.labelRow}>
            <Text style={styles.compareLabel}>
              {newLabel || `Nueva ${label}`}
            </Text>

            {canEdit && (
              <Pressable onPress={onPressEdit} hitSlop={8}>
                <Text style={styles.editText}>Editar</Text>
              </Pressable>
            )}
          </View>

          <View style={styles.comparePillsColumn}>
            {pillsToShow.map((pill) => (
              <View
                key={`new-${pill}`}
                style={[
                  styles.pill,
                  needsReview && styles.pillReview,
                  newPills.length > 0 && styles.pillSuccess,
                ]}
              >
                <Text style={styles.pillText}>{pill}</Text>
              </View>
            ))}
          </View>

          <Text style={[styles.helperText, needsReview && styles.helperReview]}>
            Texto
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.labelRow}>
        <Text style={styles.label}>{label}</Text>

        {canEdit && (
          <Pressable onPress={onPressEdit} hitSlop={8}>
            <Text style={styles.editText}>Editar</Text>
          </Pressable>
        )}
      </View>

      <View style={styles.pillsRow}>
        {pills.map((pill) => (
          <View
            key={pill}
            style={[styles.pill, needsReview && styles.pillReview]}
          >
            <Text style={styles.pillText}>{pill}</Text>
          </View>
        ))}
      </View>

      {!!helperText && (
        <Text style={[styles.helperText, needsReview && styles.helperReview]}>
          {helperText}
        </Text>
      )}
    </View>
  );
}