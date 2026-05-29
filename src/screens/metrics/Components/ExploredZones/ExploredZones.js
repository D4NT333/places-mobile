import React from "react";
import { View, Text } from "react-native";

import styles from "./styles";

export default function ExploredZones({ data }) {
  return (
    <View style={styles.grid}>
      {data.map((zone) => (
        <View key={zone.id} style={styles.chip}>
          <Text style={styles.name}>{zone.name}</Text>
          <Text style={styles.places}>{zone.places} lugares</Text>
        </View>
      ))}
    </View>
  );
}