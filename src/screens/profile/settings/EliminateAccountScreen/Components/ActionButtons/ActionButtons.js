import React from "react";
import { View, Text, Pressable } from "react-native";

import styles from "./styles";

export default function ActionButtons({
  onCancel,
  onDelete,
  disabled,
  deleteLabel = "Eliminar cuenta",
}) {
  return (
    <View style={styles.container}>
      <Pressable
        onPress={onCancel}
        style={({ pressed }) => [
          styles.button,
          styles.cancelButton,
          pressed && styles.pressed,
        ]}
      >
        <Text style={styles.cancelText}>Cancelar</Text>
      </Pressable>

      <Pressable
        onPress={onDelete}
        disabled={disabled}
        style={({ pressed }) => [
          styles.button,
          styles.deleteButton,
          disabled && styles.deleteButtonDisabled,
          pressed && !disabled && styles.pressed,
        ]}
      >
        <Text
          style={[
            styles.deleteText,
            disabled && styles.deleteTextDisabled,
          ]}
        >
          {deleteLabel}
        </Text>
      </Pressable>
    </View>
  );
}