import React from "react";
import { View, Text } from "react-native";
import styles from "./styles";

export default function AuthHeader({ title = "Imagen", subtitle }) {
  return (
    <View style={styles.container}>
      <View style={styles.logoWrap}>
        <Text style={styles.logoText}>{title}</Text>
      </View>

      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
    </View>
  );
}
