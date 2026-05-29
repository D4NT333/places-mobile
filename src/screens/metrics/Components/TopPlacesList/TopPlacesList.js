import React from "react";
import { View, Text } from "react-native";

import styles from "./styles";

export default function TopPlacesList({ data }) {
  return (
    <View>
      {data.map((place, index) => (
        <View key={place.id} style={styles.item}>
          <View style={styles.numberBadge}>
            <Text style={styles.numberText}>{index + 1}</Text>
          </View>

          <View style={styles.content}>
            <Text style={styles.name}>{place.name}</Text>
            <Text style={styles.meta}>{place.category}</Text>
          </View>

          <Text style={styles.visits}>{place.visits}</Text>
        </View>
      ))}
    </View>
  );
}