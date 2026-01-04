import React from "react";
import { View, Text, Pressable, Image  } from "react-native";
import styles from "./styles";

export default function ProfileOption({ label, icon, onPress }) {
  return (
    <Pressable onPress={onPress} style={styles.row}>
      <Text style={styles.label}>{label}</Text>

      <View style={styles.right}>
        <Image source={icon} style={styles.icon} />
      </View>

      <View style={styles.line} />
    </Pressable>
  );
}
