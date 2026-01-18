import React from "react";
import { View, Pressable, Text } from "react-native";
import styles from "./styles";

export default function LocationToggle({ value, onChange }) {
  return (
    <View style={styles.wrap}>
      <Pressable
        onPress={() => onChange("city")}
        style={[styles.pill, value === "city" ? styles.pillActive : styles.pillInactive]}
      >
        <Text style={[styles.pillText, value === "city" ? styles.textActive : styles.textInactive]}>
          Ciudad
        </Text>
      </Pressable>

      <Pressable
        onPress={() => onChange("outside")}
        style={[styles.pill, value === "outside" ? styles.pillActive : styles.pillInactive]}
      >
        <Text
          style={[
            styles.pillText,
            value === "outside" ? styles.textActive : styles.textInactive,
          ]}
        >
          Exterior
        </Text>
      </Pressable>
    </View>
  );
}
