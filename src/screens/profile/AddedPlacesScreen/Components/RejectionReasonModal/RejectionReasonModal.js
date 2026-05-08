import React from "react";
import { Modal, Pressable, Text, View } from "react-native";

import styles from "./styles";

function getReasonLabel(reason) {
  const map = {
    spam: "SPAM",
    guidelines: "No cumple lineamientos",
    offensive_content: "Contenido ofensivo",
    incorrect_information: "Información incorrecta",
    other: "Otro motivo",
  };

  return map[reason] || "Otro motivo";
}

export default function RejectionReasonModal({
  visible,
  loading,
  errorMessage,
  rejectionReason,
  onClose,
}) {
  const reasonLabel = getReasonLabel(rejectionReason?.reason);
  const message = rejectionReason?.message || "Sin motivo registrado.";

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.card}>
          <View style={styles.header}>
            <Text style={styles.title}>Motivo de rechazo</Text>

            <Pressable onPress={onClose} hitSlop={10}>
              <Text style={styles.closeText}>×</Text>
            </Pressable>
          </View>

          {loading ? (
            <Text style={styles.stateText}>Cargando motivo...</Text>
          ) : errorMessage ? (
            <Text style={styles.errorText}>{errorMessage}</Text>
          ) : (
            <>
              <View style={styles.reasonChip}>
                <Text style={styles.reasonChipText}>{reasonLabel}</Text>
              </View>

              <View style={styles.messageBox}>
                <Text style={styles.messageText}>{message}</Text>
              </View>
            </>
          )}

          <Pressable style={styles.button} onPress={onClose}>
            <Text style={styles.buttonText}>Cerrar</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}