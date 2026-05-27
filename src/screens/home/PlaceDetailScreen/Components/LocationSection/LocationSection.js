import React from "react";
import { Pressable, Text, View } from "react-native";
import styles from "./styles";

export default function LocationSection({ address, onReportProblem }) {
  return (
    <View>
      <Text style={styles.title}>Cómo llegar desde tu ubicación</Text>

      <View style={styles.mapBox}>
        <Text style={styles.mapText}>Mapa</Text>
      </View>

      <Text style={styles.locationTitle}>Ubicación</Text>
      <Text style={styles.addressText}>{address}</Text>

      <View style={styles.reportBox}>
        <Text style={styles.reportTitle}>
          ¿Hay un problema con este lugar?
        </Text>

        <Pressable onPress={onReportProblem} style={styles.reportButton}>
          <Text style={styles.reportButtonText}>Reportar problema</Text>
        </Pressable>
      </View>
    </View>
  );
}