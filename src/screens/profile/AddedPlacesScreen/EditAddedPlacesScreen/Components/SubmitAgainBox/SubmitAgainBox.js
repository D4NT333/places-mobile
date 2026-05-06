import React from "react";
import { Pressable, Text, View } from "react-native";

import styles from "./styles";

export default function SubmitAgainBox({ onSubmit }) {
  return (
    <View style={styles.container}>
      <Text style={styles.warningText}>
        Esta es la última oportunidad para corregir esta propuesta.
      </Text>

      <Text style={styles.warningText}>
        Si vuelve a ser devuelta, el lugar deberá registrarse nuevamente desde cero.
      </Text>

      <Pressable onPress={onSubmit} style={styles.button}>
        <Text style={styles.buttonText}>Enviar de nuevo</Text>
      </Pressable>
    </View>
  );
}