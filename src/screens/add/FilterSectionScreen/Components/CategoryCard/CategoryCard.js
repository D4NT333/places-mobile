import React from "react";
import { Pressable, Text } from "react-native";
import styles from "./styles";

export default function CategoryCard({ item, selected, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.card, selected && styles.selected]}
    >
      <Text style={styles.emoji}>{item.emoji}</Text>
      <Text style={styles.label}>{item.label}</Text>
    </Pressable>
  );
}