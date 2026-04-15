import React from "react";
import { Modal, Pressable, Text, View } from "react-native";
import styles from "./styles";

export default function ExitCommentModal({
  visible,
  onDiscard,
  onContinue,
}) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
      onRequestClose={onContinue}
    >
      <View style={styles.overlay}>
        <View
          style={styles.card}
          accessible
          accessibilityRole="alert"
          accessibilityLabel="Confirmación para salir de la calificación"
        >
          <Text style={styles.message}>
            Si sales ahora, se perderá tu progreso.
          </Text>

          <View style={styles.actionsRow}>
            <Pressable
              onPress={onDiscard}
              style={styles.secondaryButton}
              accessibilityRole="button"
              accessibilityLabel="Descartar calificación"
              accessibilityHint="Cierra esta pantalla y descarta tu progreso"
            >
              <Text style={styles.secondaryButtonText}>Descartar</Text>
            </Pressable>

            <Pressable
              onPress={onContinue}
              style={styles.primaryButton}
              accessibilityRole="button"
              accessibilityLabel="Seguir calificando"
              accessibilityHint="Cierra este mensaje y vuelve a la calificación"
            >
              <Text style={styles.primaryButtonText}>
                Seguir calificando
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}