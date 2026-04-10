import React from "react";
import { Image, Pressable, Text, View } from "react-native";
import styles from "./styles";

export default function CategoryCard({ item, selected, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.card, selected && styles.selected]}
    >
      {item.iconSource ? (
        <Image source={item.iconSource} style={styles.icon} />
      ) : (
        <View style={styles.iconFallback} />
      )}

      <Text style={styles.label}>{item.label}</Text>
    </Pressable>
  );
}