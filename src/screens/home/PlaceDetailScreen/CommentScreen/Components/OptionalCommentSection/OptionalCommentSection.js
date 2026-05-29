import React from "react";
import { Text, TextInput, View } from "react-native";
import styles from "./styles";

export default function OptionalCommentSection({
  value,
  onChangeText,
  maxLength = 200,
}) {
  const currentLength = value?.length ?? 0;

  return (
    <View style={styles.container}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder="Agrega un comentario (opcional)"
        placeholderTextColor="#7A818C"
        maxLength={maxLength}
        multiline
        textAlignVertical="top"
        style={styles.input}
      />

      <View style={styles.footerRow}>
        <Text style={styles.helperText}>Comentario opcional</Text>
        <Text style={styles.counterText}>
          {currentLength}/{maxLength}
        </Text>
      </View>
    </View>
  );
}