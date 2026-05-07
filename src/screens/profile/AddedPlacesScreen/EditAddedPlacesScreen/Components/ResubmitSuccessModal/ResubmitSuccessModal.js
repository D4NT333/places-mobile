import React from "react";
import { Modal, Pressable, Text, View } from "react-native";

import styles from "./styles";

export default function ResubmitSuccessModal({ visible, onClose }) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.card}>
          <Text style={styles.title}>Propuesta reenviada</Text>

          <Text style={styles.message}>
            Tus correcciones fueron enviadas correctamente.
          </Text>

          <Text style={styles.message}>
            El equipo revisará los cambios pronto y te avisaremos cuando exista
            una nueva respuesta.
          </Text>

          <Pressable style={styles.button} onPress={onClose}>
            <Text style={styles.buttonText}>Entendido</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}