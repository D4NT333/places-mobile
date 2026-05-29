import React from "react";
import { Pressable, Text, TextInput, View } from "react-native";

import styles from "./styles";

function getTextLength(value = "") {
  return String(value || "").trim().length;
}

function getCounterLabel(value = "", maxLength) {
  if (!maxLength) return "";

  return `${String(value || "").length}/${maxLength}`;
}

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
  maxLength,
  minLength = 0,
}) {
  const needsReview = Boolean(reviewField?.selected);
  const canEdit = needsReview && typeof onPressEdit === "function";

  const oldCounter = getCounterLabel(oldValue, maxLength);
  const newCounter = getCounterLabel(value, maxLength);

  const newValueLength = getTextLength(value);
  const hasMinValidation = minLength > 0;

  const isNewValueValid = hasMinValidation
    ? newValueLength >= minLength
    : true;

  const shouldWrapText = multiline || Boolean(maxLength);

  const newInputStatusStyle =
    hasMinValidation && isNewValueValid
      ? styles.inputSuccess
      : needsReview
      ? styles.inputReview
      : null;

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

            {!!oldCounter && <Text style={styles.counterText}>{oldCounter}</Text>}
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.compareColumn}>
          <View style={styles.labelRow}>
            <Text style={styles.compareLabel}>
              {newLabel || `Nuevo ${label}`}
            </Text>

            {canEdit && (
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
            multiline={shouldWrapText}
            maxLength={maxLength}
            style={[
              styles.compareInput,
              shouldWrapText && styles.compareMultilineInput,
              newInputStatusStyle,
            ]}
          />

          <View style={styles.helperRow}>
            <View style={styles.emptyHelperSpace} />

            {!!newCounter && (
              <Text
                style={[
                  styles.counterText,
                  hasMinValidation &&
                    isNewValueValid &&
                    styles.counterSuccess,
                ]}
              >
                {newCounter}
              </Text>
            )}
          </View>
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

      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#9CA3AF"
        multiline={shouldWrapText}
        maxLength={maxLength}
        style={[
          styles.input,
          shouldWrapText && styles.multilineInput,
          needsReview && styles.inputReview,
        ]}
      />

      {!!helperText && (
        <View style={styles.helperRow}>
          <Text style={[styles.helperText, needsReview && styles.helperReview]}>
            {helperText}
          </Text>

          {!!newCounter && <Text style={styles.counterText}>{newCounter}</Text>}
        </View>
      )}
    </View>
  );
}