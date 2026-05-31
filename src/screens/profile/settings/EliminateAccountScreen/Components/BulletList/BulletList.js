import React from "react";
import { View, Text } from "react-native";

import styles from "./styles";

export default function BulletList({ items = [] }) {
  return (
    <View style={styles.container}>
      {items.map((item) => (
        <View key={item} style={styles.row}>
          <View style={styles.dot} />
          <Text style={styles.text}>{item}</Text>
        </View>
      ))}
    </View>
  );
}