import React from "react";
import { View, Pressable, Text } from "react-native";
import styles from "./styles";

export default function BottomActions({
  onCancel,
  onSubmit,
  submitDisabled = false,
  isSubmitting = false,
}) {
  return (
    <View style={styles.row}>
      <Pressable
        onPress={onCancel}
        style={[styles.btn, styles.btnGhost]}
        disabled={isSubmitting}
      >
        <Text style={[styles.btnText, styles.textGhost]}>Cancelar</Text>
      </Pressable>

      <Pressable
        onPress={onSubmit}
        disabled={submitDisabled}
        style={[
          styles.btn,
          styles.btnPrimary,
          submitDisabled && styles.submitButtonDisabled,
        ]}
      >
        <Text
          style={[
            styles.btnText,
            styles.textPrimary,
            submitDisabled && styles.submitTextDisabled,
          ]}
        >
          {isSubmitting ? "Subiendo..." : "Subir"}
        </Text>
      </Pressable>
    </View>
  );
}