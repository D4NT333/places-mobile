import React from "react";
import { View, Text } from "react-native";

import styles from "./styles";

export default function MetricCard({ label, value, helper }) {
  return (
    <View style={styles.card}>
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.helper}>{helper}</Text>
    </View>
  );
}