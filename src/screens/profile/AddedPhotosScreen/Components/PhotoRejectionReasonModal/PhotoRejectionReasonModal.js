import React from "react";

import {
  ActivityIndicator,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import styles from "./styles";

const REASON_LABELS = {
  spam: "SPAM",

  guidelines:
    "No cumple lineamientos",

  offensive_content:
    "Contenido ofensivo",

  incorrect_information:
    "Información incorrecta",

  other:
    "Otro motivo",
};

export default function PhotoRejectionReasonModal({
  visible,
  loading = false,
  errorMessage = "",
  rejection = null,
  onClose,
}) {
  const reasonLabel =
    rejection?.reasonLabel ||
    REASON_LABELS[
      rejection?.reason
    ] ||
    "";

  const message =
    rejection?.message || "";

  const handleClose = () => {
    if (loading) {
      return;
    }

    onClose?.();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
      onRequestClose={handleClose}
    >
      <View style={styles.overlay}>
        <Pressable
          style={
            StyleSheet.absoluteFillObject
          }
          onPress={handleClose}
        />

        <View style={styles.modalCard}>
          <View style={styles.header}>
            <Text style={styles.title}>
              Motivo del rechazo
            </Text>

            <Pressable
              disabled={loading}
              hitSlop={10}
              onPress={handleClose}
              style={({ pressed }) => [
                styles.closeIconButton,

                pressed &&
                  !loading &&
                  styles.buttonPressed,
              ]}
            >
              <Text
                style={
                  styles.closeIconText
                }
              >
                ×
              </Text>
            </Pressable>
          </View>

          <View style={styles.divider} />

          <View style={styles.content}>
            {loading ? (
              <View
                style={
                  styles.centerContent
                }
              >
                <ActivityIndicator
                  size="large"
                  color="#374151"
                />

                <Text
                  style={
                    styles.loadingText
                  }
                >
                  Cargando motivo...
                </Text>
              </View>
            ) : errorMessage ? (
              <View
                style={
                  styles.centerContent
                }
              >
                <Text
                  style={
                    styles.errorText
                  }
                >
                  {errorMessage}
                </Text>
              </View>
            ) : (
              <>
                {reasonLabel ? (
                  <View
                    style={
                      styles.reasonChip
                    }
                  >
                    <Text
                      style={
                        styles.reasonChipText
                      }
                    >
                      {reasonLabel}
                    </Text>
                  </View>
                ) : null}

                {message ? (
                  <Text
                    style={
                      styles.message
                    }
                  >
                    {message}
                  </Text>
                ) : (
                  <Text
                    style={
                      styles.emptyMessage
                    }
                  >
                    No se especificó una explicación para el rechazo.
                  </Text>
                )}
              </>
            )}
          </View>

          <View style={styles.footer}>
            <Pressable
              disabled={loading}
              onPress={handleClose}
              style={({ pressed }) => [
                styles.closeButton,

                pressed &&
                  !loading &&
                  styles.buttonPressed,

                loading &&
                  styles.closeButtonDisabled,
              ]}
            >
              <Text
                style={
                  styles.closeButtonText
                }
              >
                Cerrar
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}