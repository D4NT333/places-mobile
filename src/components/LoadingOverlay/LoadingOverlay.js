import React from "react";
import { Modal, View, Text, ActivityIndicator } from "react-native";
import styles from "./styles";

export default function LoadingOverlay({
  visible = false,
  loading = true,
  title = "Cargando...",
  message = "",
}) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
    >
      <View style={styles.backdrop}>
        <View style={styles.card}>
          {loading ? (
            <ActivityIndicator size="large" />
          ) : (
            <Text style={styles.successIcon}>✓</Text>
          )}

          <Text style={styles.title}>{title}</Text>

          {!!message && (
            <Text style={styles.message}>{message}</Text>
          )}
        </View>
      </View>
    </Modal>
  );
}