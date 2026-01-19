import React from "react";
import { View, Text } from "react-native";
import Slider from "@react-native-community/slider";
import styles from "./styles";

export default function RadiusSlider({ valueKm, minKm, maxKm, onChange }) {
  return (
    <View style={styles.wrap}>
      <View style={styles.labelsRow}>
        <Text style={styles.label}>{minKm}Km</Text>
        <Text style={styles.value}>{valueKm}Km</Text>
        <Text style={styles.label}>{maxKm}Km</Text>
      </View>

      <Slider
        value={valueKm}
        minimumValue={minKm}
        maximumValue={maxKm}
        step={1}
        onValueChange={onChange}
        minimumTrackTintColor="#111"
        maximumTrackTintColor="#DDD"
        thumbTintColor="#111"
      />
    </View>
  );
}
