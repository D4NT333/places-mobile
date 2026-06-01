import React from "react";
import { Pressable, Text, View, Image } from "react-native";

import { icons } from "../../../../../../../assets/icons";
import styles from "./styles";

export default function GoogleConfirmButton({ confirmed, loading, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      disabled={confirmed || loading}
      style={({ pressed }) => [
        styles.container,
        confirmed && styles.containerConfirmed,
        pressed && !confirmed && !loading && styles.pressed,
      ]}
    >
      <View style={styles.leftContent}>
        <View style={styles.iconCircle}>
          <Image source={icons.google} style={styles.googleIcon} />
        </View>

        <View style={styles.textBlock}>
          <Text style={styles.title}>
            {confirmed
              ? "Identidad confirmada"
              : loading
              ? "Confirmando..."
              : "Confirmar con Google"}
          </Text>

          <Text style={styles.subtitle}>
            {confirmed
              ? "Ya puedes continuar con la eliminación."
              : loading
              ? "Selecciona tu cuenta de Google para continuar."
              : "Necesario antes de eliminar tu cuenta."}
          </Text>
        </View>
      </View>

      <View style={[styles.statusCircle, confirmed && styles.statusCircleDone]}>
        <Text style={[styles.statusText, confirmed && styles.statusTextDone]}>
          {confirmed ? "✓" : "›"}
        </Text>
      </View>
    </Pressable>
  );
}