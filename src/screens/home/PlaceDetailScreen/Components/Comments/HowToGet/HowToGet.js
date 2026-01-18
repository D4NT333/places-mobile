import React from "react";
import { View, Text, Pressable } from "react-native";
import styles from "./styles";

export default function HowToGetSection({ location, address }) {
  const handleOpenMaps = () => {
    // Luego: Linking.openURL con google maps
    console.log("Open maps", location);
  };

  return (
    <View style={styles.block}>
      <Text style={styles.title}>Cómo llegar desde tu ubicación</Text>

      <View style={styles.mapPlaceholder}>
        <Text style={styles.mapText}>Mapa (placeholder)</Text>
      </View>

      <Text style={styles.addressLabel}>Ubicación</Text>
      <Text style={styles.addressText}>{address || "Sin dirección"}</Text>

      <Pressable onPress={handleOpenMaps} style={styles.btn}>
        <Text style={styles.btnText}>Abrir en Maps</Text>
      </Pressable>
    </View>
  );
}
