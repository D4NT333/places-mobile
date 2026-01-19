import React from "react";
import { View, Text } from "react-native";
import styles from "./styles";
import RadiusSlider from "../RadiusSlider";

export default function RadiusCard({ subtitle, helper, valueKm, minKm, maxKm, onChange }) {
  return (
    <View style={styles.card}>
      <Text style={styles.subtitle}>{subtitle}</Text>

      <RadiusSlider valueKm={valueKm} minKm={minKm} maxKm={maxKm} onChange={onChange} />

      <Text style={styles.helper}>{helper}</Text>
    </View>
  );
}
