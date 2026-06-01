import React from "react";
import { Modal, Pressable, Text, View } from "react-native";

import styles from "./styles";

export default function DeleteSubtagWarningModal({
  visible,
  subtagLabel = "",
  onCancel,
  onConfirm,
}) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onCancel}
    >
      <View style={styles.overlay}>
        <View style={styles.card}>
          <Text style={styles.title}>Eliminar subetiqueta</Text>

          <Text style={styles.message}>
            Si eliminas esta subetiqueta, la propuesta continuará solo con las
            subetiquetas restantes.
          </Text>

          {!!subtagLabel && (
            <View style={styles.pill}>
              <Text style={styles.pillText}>{subtagLabel}</Text>
            </View>
          )}

          <Text style={styles.warningText}>
            No se agregará otra subetiqueta en su lugar. Podrás continuar con la
            corrección usando la que queda.
          </Text>

          <View style={styles.actions}>
            <Pressable style={styles.cancelButton} onPress={onCancel}>
              <Text style={styles.cancelButtonText}>Cancelar</Text>
            </Pressable>

            <Pressable style={styles.confirmButton} onPress={onConfirm}>
              <Text style={styles.confirmButtonText}>Continuar</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}