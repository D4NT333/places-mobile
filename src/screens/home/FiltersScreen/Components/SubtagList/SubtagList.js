import React from "react";
import { Pressable, Text, View } from "react-native";
import styles from "./styles";

export default function SubtagList({ items, selected, onToggle }) {
  return (
    <View style={styles.wrap}>
      {items.map((tag) => {
        const active = selected.includes(tag);
        return (
          <Pressable
            key={tag}
            onPress={() => onToggle(tag)}
            style={[styles.pill, active && styles.pillActive]}
          >
            <Text style={[styles.txt, active && styles.txtActive]}>{tag}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}
