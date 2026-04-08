import React from "react";
import { View, Text, Pressable } from "react-native";
import Slider from "@react-native-community/slider";
import styles from "./styles";

export default function PriceSection({
  config,
  value,
  isFree,
  onChangeValue,
  onToggleFree,
}) {
  if (!config) return null;

  const { min, max, step, hasFreeOption } = config;
  const disabled = hasFreeOption && isFree;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Precio</Text>

      {hasFreeOption && (
        <Pressable onPress={onToggleFree} style={styles.freeRow}>
          <View style={[styles.box, isFree && styles.boxActive]} />
          <Text style={styles.freeText}>Gratis</Text>
        </Pressable>
      )}

      <View style={styles.labels}>
        <Text>${min}</Text>
        <Text>{isFree ? "Gratis" : `$${value}`}</Text>
        <Text>${max}</Text>
      </View>

      <Slider
        minimumValue={min}
        maximumValue={max}
        step={step}
        value={value}
        onValueChange={onChangeValue}
        disabled={disabled}
      />
    </View>
  );
}