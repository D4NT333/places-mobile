import React from "react";
import { Text, TextInput, View } from "react-native";
import styles from "./styles";

export default function OptionalCommentSection({
  value,
  onChangeText,
  maxLength = 200,
}) {
  const currentLength = value.length;
  const hasReachedLimit = currentLength >= maxLength;

  return (
    <View style={styles.container}>
      <View style={styles.inputWrapper}>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          maxLength={maxLength}
          multiline
          placeholder="Agrega un comentario (opcional)"
          placeholderTextColor="#6B7280"
          style={styles.input}
          textAlignVertical="top"
          accessibilityLabel="Agrega un comentario opcional"
          accessibilityHint="Escribe un comentario adicional sobre tu experiencia"
        />
      </View>

      <View style={styles.footerRow}>
        <Text style={styles.helperText}>
          {hasReachedLimit ? "Límite alcanzado" : "Comentario opcional"}
        </Text>

        <Text style={styles.counterText}>
          {currentLength}/{maxLength}
        </Text>
      </View>
    </View>
  );
}