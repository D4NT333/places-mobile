import React from "react";
import { View, Text } from "react-native";
import styles from "./styles";

export default function PlaceCard({ item, index }) {
  const isLeft = index % 2 === 0;

  return (
    <View
      style={[
        styles.card,
        { height: item.height },
        isLeft ? { marginRight: 8 } : { marginLeft: 8 },
      ]}
    >
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.sub}>Item #{item.id}</Text>
    </View>
  );
}
