import React, { useState } from "react";
import { View, Text, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LayoutScreen } from "../../../../layouts";

import styles from "./styles";
import RadiusCard from "./Components/RadiusCard";

export default function SearchRadiusScreen() {
  const navigation = useNavigation();

  const MIN_KM = 1;
  const MAX_KM = 10;

  const [radiusKm, setRadiusKm] = useState(2);

  return (
    <LayoutScreen
      scroll
      edges={["top"]}
      padding={{ top: 16, left: 16, right: 16, bottom: 24 }}
      bg="#FFFFFF"
    >
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} style={styles.backBtn} hitSlop={10}>
          <Text style={styles.backIcon}>←</Text>
        </Pressable>

        <Text style={styles.headerTitle}>Radio de búsqueda</Text>
        <View style={{ width: 36 }} />
      </View>

      {/* Card */}
      <RadiusCard
        subtitle="Selecciona el rango de búsqueda"
        helper="Buscamos lugares dentro de este rango para recomendarte. Se guarda automáticamente."
        valueKm={radiusKm}
        minKm={MIN_KM}
        maxKm={MAX_KM}
        onChange={(v) => setRadiusKm(Math.round(v))}
      />
    </LayoutScreen>
  );
}
