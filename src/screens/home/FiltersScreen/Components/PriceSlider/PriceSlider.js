import React from "react";
import { Pressable, Text, View } from "react-native";
import styles from "./styles";

export default function PriceSlider({ min, max, value, onChange }) {
  return (
    <View style={styles.row}>
      <Pressable
        onPress={() => onChange(Math.max(min, value - 10))}
        style={styles.btn}
      >
        <Text style={styles.btnTxt}>-</Text>
      </Pressable>

      <Text style={styles.value}>${value}</Text>

      <Pressable
        onPress={() => onChange(Math.min(max, value + 10))}
        style={styles.btn}
      >
        <Text style={styles.btnTxt}>+</Text>
      </Pressable>
    </View>
  );
}
