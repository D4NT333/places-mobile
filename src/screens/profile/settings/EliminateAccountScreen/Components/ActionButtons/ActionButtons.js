import React from "react";
import { View, Pressable, Text } from "react-native";
import styles from "./styles";

export default function ActionButtons({ onCancel = () => {}, onDelete = () => {} }) {
  return (
    <View style={styles.row}>
      <Pressable onPress={onCancel} style={styles.btn}>
        <Text style={styles.text}>Cancelar</Text>
      </Pressable>

      <Pressable onPress={onDelete} style={styles.btn}>
        <Text style={styles.text}>Eliminar cuenta</Text>
      </Pressable>
    </View>
  );
}
