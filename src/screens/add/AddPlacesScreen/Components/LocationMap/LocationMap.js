import React from "react";
import { View, Text } from "react-native";
import styles from "./styles";

export default function LocationMap() {
  return (
    <View style={styles.box}>
      <Text style={styles.title}>Mapa</Text>
      <Text style={styles.subtitle}>Placeholder (luego react-native-maps + pin)</Text>
    </View>
  );
}
