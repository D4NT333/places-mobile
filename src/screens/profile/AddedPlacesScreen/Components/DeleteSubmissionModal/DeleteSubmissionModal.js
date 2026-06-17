import React from "react";

import {
  ActivityIndicator,
  Modal,
  Pressable,
  Text,
  View,
} from "react-native";

import styles from "./styles";

export default function DeleteSubmissionModal({
  visible,
  title = "Eliminar propuesta",
  itemName = "esta propuesta",
  loading = false,
  onCancel,
  onConfirm,
}) {
  const handleCancel = () => {
    if (loading) return;

    onCancel?.();
  };

  const handleConfirm = () => {
    if (loading) return;

    onConfirm?.();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
      onRequestClose={handleCancel}
    >
      <View style={styles.overlay}>
        <View style={styles.modalCard}>
          <Text style={styles.title}>
            {title}
          </Text>

          <Text style={styles.message}>
            ¿Seguro que quieres eliminar{" "}
            <Text style={styles.itemName}>
              {itemName}
            </Text>
            ?
          </Text>

          <Text style={styles.warningText}>
            La propuesta será enviada para eliminación definitiva.
            Esta acción no se puede deshacer.
          </Text>

          <View style={styles.buttonsRow}>
            <Pressable
              style={[
                styles.cancelButton,
                loading && styles.disabledButton,
              ]}
              disabled={loading}
              onPress={handleCancel}
            >
              <Text style={styles.cancelButtonText}>
                Cancelar
              </Text>
            </Pressable>

            <Pressable
              style={[
                styles.deleteButton,
                loading && styles.disabledButton,
              ]}
              disabled={loading}
              onPress={handleConfirm}
            >
              {loading ? (
                <ActivityIndicator
                  size="small"
                  color="#FFFFFF"
                />
              ) : (
                <Text style={styles.deleteButtonText}>
                  Eliminar
                </Text>
              )}
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}