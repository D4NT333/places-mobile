import React from "react";
import { Pressable, View, Text } from "react-native";
import styles from "./styles";

export default function PlaceSearchRow({ name, distanceKm, rating, onPress }) {
  return (
    <Pressable onPress={onPress}>
      <View style={styles.card}>
        <View style={styles.avatar} />

        <View style={styles.info}>
          <Text style={styles.name} numberOfLines={1}>
            {name}
          </Text>
          <Text style={styles.distance}>A {distanceKm}km</Text>
        </View>

        <View style={styles.right}>
          <Text style={styles.rating}>{rating?.toFixed?.(1) ?? rating}</Text>
          <Text style={styles.star}>⭐</Text>
        </View>
      </View>
    </Pressable>
  );
}
