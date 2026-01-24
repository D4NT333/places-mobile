import React from "react";
import { Pressable, Text } from "react-native";
import styles from "./styles";

export default function TextLink({ text, onPress, align = "left" }) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.wrap, { alignSelf: align === "center" ? "center" : "flex-start" }, pressed && styles.pressed]}>
      <Text style={[styles.text, align === "center" && { textAlign: "center" }]}>{text}</Text>
    </Pressable>
  );
}
