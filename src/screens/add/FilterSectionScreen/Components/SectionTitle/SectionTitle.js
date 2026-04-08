import React from "react";
import { View, Text } from "react-native";
import styles from "./styles";

export default function SectionTitle({ title, subtitle }) {
  return (
    <View style={styles.container}>
      {title && <Text style={styles.title}>{title}</Text>}
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
    </View>
  );
}