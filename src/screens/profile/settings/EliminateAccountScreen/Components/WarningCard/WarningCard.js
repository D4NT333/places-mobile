import React from "react";
import { View, Text } from "react-native";

import styles from "./styles";

export default function WarningCard() {
  return (
    <View style={styles.container}>
      <View style={styles.iconCircle}>
        <Text style={styles.icon}>!</Text>
      </View>

      <View style={styles.textContent}>
        <Text style={styles.title}>Esta acción es permanente</Text>

        <Text style={styles.description}>
          Al eliminar tu cuenta perderás el acceso a tu perfil, actividad y datos
          asociados dentro de Lsearch.
        </Text>
      </View>
    </View>
  );
}