import React from "react";
import { Text, View } from "react-native";
import styles from "./styles";

export default function EmptyState() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Aún no tienes favoritos</Text>
      <Text style={styles.subtitle}>
        Guarda lugares tocando el corazón y aparecerán aquí.
      </Text>
    </View>
  );
}
