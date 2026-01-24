import React from "react";
import { Pressable, Text, View } from "react-native";
import styles from "./styles";

export default function AuthFooterLink({ text, linkText, onPress }) {
  return (
    <View style={styles.row}>
      <Text style={styles.text}>{text} </Text>
      <Pressable onPress={onPress} hitSlop={10}>
        <Text style={styles.link}>{linkText}</Text>
      </Pressable>
    </View>
  );
}
