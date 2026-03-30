import React from "react";
import { Pressable, Text, View } from "react-native";
import styles from "./styles";

export default function RatingPicker({ value, onChange }) {
  const stars = [1, 2, 3, 4, 5];
  return (
    <View style={styles.row}>
      {stars.map((s) => {
        const active = s <= value;
        return (
          <Pressable key={s} onPress={() => onChange(s)} style={styles.starBtn}>
            <Text style={[styles.star, active && styles.starActive]}>★</Text>
          </Pressable>
        );
      })}
      <Pressable onPress={() => onChange(0)} style={styles.resetBtn}>
        <Text style={styles.resetTxt}>Reset</Text>
      </Pressable>
    </View>
  );
}
