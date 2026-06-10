import React from "react";
import { ActivityIndicator, Modal, Pressable, Text, View } from "react-native";

import styles from "./styles";

const REASON_LABELS = {
  spam: "SPAM",
  guidelines: "No cumple lineamientos",
  offensive_content: "Contenido ofensivo",
  incorrect_information: "Información incorrecta",
  irrelevant_description: "Descripción irrelevante",
  other: "Otro motivo",
};

function getReasonLabel(reason) {
  return REASON_LABELS[reason] || "Motivo no especificado";
}

export default function RejectionReasonModal({
  visible,
  loading,
  rejectionData,
  errorMessage,
  onClose,
}) {
  const reason = rejectionData?.reason || "";
  const message = rejectionData?.message || "";

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <View style={styles.header}>
            <Text style={styles.title}>Motivo de rechazo</Text>

            <Pressable
              onPress={onClose}
              style={styles.closeButton}
              hitSlop={10}
            >
              <Text style={styles.closeText}>×</Text>
            </Pressable>
          </View>

          {loading ? (
            <View style={styles.loadingBox}>
              <ActivityIndicator size="large" />
              <Text style={styles.loadingText}>Cargando motivo...</Text>
            </View>
          ) : errorMessage ? (
            <View style={styles.errorBox}>
              <Text style={styles.errorTitle}>No se pudo cargar</Text>
              <Text style={styles.errorText}>{errorMessage}</Text>
            </View>
          ) : (
            <View style={styles.content}>
              <Text style={styles.label}>Razón seleccionada</Text>

              <View style={styles.reasonChip}>
                <Text style={styles.reasonChipText}>
                  {getReasonLabel(reason)}
                </Text>
              </View>

              <Text style={styles.label}>Comentario del administrador</Text>

              <View style={styles.messageBox}>
                <Text style={styles.messageText}>
                  {message ||
                    "La propuesta fue rechazada, pero no se encontró un mensaje específico."}
                </Text>
              </View>
            </View>
          )}

          <Pressable onPress={onClose} style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>Entendido</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}