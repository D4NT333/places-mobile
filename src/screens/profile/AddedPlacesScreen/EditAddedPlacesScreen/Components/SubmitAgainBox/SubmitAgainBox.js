import React from "react";
import { Pressable, Text, View } from "react-native";

import styles from "./styles";

export default function SubmitAgainBox({ onSubmit }) {
  return (
    <View style={styles.finalMessageBox}>
      <Text style={styles.finalMessage}>
        Esta es la última oportunidad para corregir esta propuesta.
      </Text>

      <Text style={styles.finalMessage}>
        Si vuelve a ser devuelta, el lugar deberá registrarse nuevamente desde
        cero.
      </Text>

      <Pressable style={styles.submitButton} onPress={onSubmit}>
        <Text style={styles.submitButtonText}>Enviar de nuevo</Text>
      </Pressable>
    </View>
  );
}