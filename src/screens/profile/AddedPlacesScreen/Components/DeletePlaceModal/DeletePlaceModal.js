import React from "react";
import { Modal, Pressable, Text, View } from "react-native";

import styles from "./styles";

export default function DeletePlaceModal({
  visible,
  placeName,
  onCancel,
  onConfirm,
}) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
      onRequestClose={onCancel}
    >
      <View style={styles.overlay}>
        <View style={styles.modalCard}>
          <Text style={styles.title}>Eliminar lugar</Text>

          <Text style={styles.message}>
            ¿Seguro que quieres eliminar{" "}
            <Text style={styles.placeName}>{placeName}</Text>?
          </Text>

          <Text style={styles.warningText}>
            Esta acción no se puede deshacer.
          </Text>

          <View style={styles.buttonsRow}>
            <Pressable style={styles.cancelButton} onPress={onCancel}>
              <Text style={styles.cancelButtonText}>Cancelar</Text>
            </Pressable>

            <Pressable style={styles.deleteButton} onPress={onConfirm}>
              <Text style={styles.deleteButtonText}>Eliminar</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}