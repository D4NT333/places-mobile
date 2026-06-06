import React from "react";
import { Text, TextInput, View } from "react-native";
import styles from "./styles";

export default function OptionalCommentSection({
  value,
  onChangeText,
  onBlur,
  minLength = 80,
  maxLength = 200,
  errorMessage,
}) {
  const currentLength = value?.trim().length ?? 0;
  const hasError = Boolean(errorMessage);

  return (
    <View style={styles.container}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        onBlur={onBlur}
        placeholder="Agrega un comentario"
        placeholderTextColor="#7A818C"
        maxLength={maxLength}
        multiline
        textAlignVertical="top"
        style={[styles.input, hasError && styles.inputError]}
      />

      <View style={styles.footerRow}>
        {hasError ? (
          <Text style={styles.errorText}>{errorMessage}</Text>
        ) : (
          <Text style={styles.helperText}>
            Mínimo {minLength} caracteres
          </Text>
        )}

        <Text style={[styles.counterText, hasError && styles.counterError]}>
          {currentLength}/{maxLength}
        </Text>
      </View>
    </View>
  );
}