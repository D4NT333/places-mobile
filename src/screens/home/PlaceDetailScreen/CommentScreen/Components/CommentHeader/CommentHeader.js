import React from "react";
import { Pressable, Text, View } from "react-native";
import styles from "./styles";

export default function CommentHeader({ title, subtitle, onClose }) {
  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <Pressable
          onPress={onClose}
          style={styles.closeButton}
          accessibilityRole="button"
          accessibilityLabel="Cerrar pantalla de calificación"
          accessibilityHint="Regresa a la pantalla anterior"
          hitSlop={10}
        >
          <Text style={styles.closeText}>×</Text>
        </Pressable>

        <Text
          style={styles.title}
          accessibilityRole="header"
          numberOfLines={1}
        >
          {title}
        </Text>

        <View style={styles.rightSpacer} />
      </View>

      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
}