import React from "react";
import { View, Text } from "react-native";
import styles from "./styles";

export default function SuccessToast({ visible }) {
  if (!visible) return null;

  return (
    <View style={styles.overlay} pointerEvents="none">
      <View style={styles.toast}>
        <Text style={styles.text}>
          Gracias por tu apoyo{"\n"}Revisaremos tu reporte{"\n"}pronto
        </Text>
      </View>
    </View>
  );
}
