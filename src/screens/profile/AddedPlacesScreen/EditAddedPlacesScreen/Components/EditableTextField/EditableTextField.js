import React from "react";
import { Pressable, Text, TextInput, View } from "react-native";

import styles from "./styles";

export default function EditableTextField({
  label,
  newLabel,
  oldValue,
  value,
  onChangeText,
  placeholder,
  helperText,
  reviewField,
  onPressEdit,
  isEditing = false,
  multiline = false,
}) {
  const needsReview = Boolean(reviewField?.selected);

  if (isEditing) {
    return (
      <View style={styles.compareContainer}>
        <View style={styles.compareColumn}>
          <Text style={styles.compareLabel}>{label}</Text>

          <View style={[styles.compareBox, needsReview && styles.inputReview]}>
            <Text style={styles.oldValueText}>{oldValue}</Text>
          </View>

          <View style={styles.helperRow}>
            <Text style={[styles.helperText, needsReview && styles.helperReview]}>
              {helperText}
            </Text>

            <Text style={styles.counterText}>3/3</Text>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.compareColumn}>
          <Text style={styles.compareLabel}>{newLabel || `Nuevo ${label}`}</Text>

          <TextInput
            value={value}
            onChangeText={onChangeText}
            placeholder={placeholder}
            placeholderTextColor="#9CA3AF"
            multiline={multiline}
            style={[
              styles.compareInput,
              multiline && styles.compareMultilineInput,
              needsReview && styles.inputReview,
            ]}
          />

          <View style={styles.helperRow}>
            <Text style={[styles.helperText, needsReview && styles.helperReview]}>
              Texto
            </Text>

            <Text style={styles.counterText}>3/3</Text>
          </View>
        </View>
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

      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#9CA3AF"
        multiline={multiline}
        style={[
          styles.input,
          multiline && styles.multilineInput,
          needsReview && styles.inputReview,
        ]}
      />

      {!!helperText && (
        <Text style={[styles.helperText, needsReview && styles.helperReview]}>
          {helperText}
        </Text>
      )}
    </View>
  );
}