import React from "react";
import { Pressable, Text, View } from "react-native";
import styles from "./styles";

export default function CommentActions({
  onAddDetails,
  onSubmit,
  submitDisabled = false,
  hideAddDetails = false,
}) {
  return (
    <View style={styles.container}>
      {!hideAddDetails ? (
        <Pressable
          onPress={onAddDetails}
          style={styles.secondaryButton}
          accessibilityRole="button"
          accessibilityLabel="Agregar detalles"
          accessibilityHint="Continúa con una calificación más completa"
        >
          <Text style={styles.secondaryButtonText}>Agregar detalles</Text>
        </Pressable>
      ) : (
        <View style={styles.buttonPlaceholder} />
      )}

      <Pressable
        onPress={onSubmit}
        disabled={submitDisabled}
        style={[
          styles.primaryButton,
          submitDisabled && styles.primaryButtonDisabled,
        ]}
        accessibilityRole="button"
        accessibilityLabel="Calificar"
        accessibilityHint="Envía tu calificación"
        accessibilityState={{ disabled: submitDisabled }}
      >
        <Text
          style={[
            styles.primaryButtonText,
            submitDisabled && styles.primaryButtonTextDisabled,
          ]}
        >
          Calificar
        </Text>
      </Pressable>
    </View>
  );
}