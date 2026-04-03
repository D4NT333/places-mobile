import React from "react";
import { View, Pressable, Text } from "react-native";
import styles from "./styles";

export default function BottomActions({ onCancel, onSubmit }) {
  return (
    <View style={styles.row}>
      <Pressable onPress={onCancel} style={[styles.btn, styles.btnGhost]}>
        <Text style={[styles.btnText, styles.textGhost]}>Cancelar</Text>
      </Pressable>

      <Pressable onPress={onSubmit} style={[styles.btn, styles.btnPrimary]}>
        <Text style={[styles.btnText, styles.textPrimary]}>Subir</Text>
      </Pressable>
    </View>
  );
}
