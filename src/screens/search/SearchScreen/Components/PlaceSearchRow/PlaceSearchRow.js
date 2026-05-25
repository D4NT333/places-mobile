import React from "react";
import { View, Text, Pressable } from "react-native";
import styles from "./styles";

import RatingStars from "../../../../../components/RatingStars";

export default function PlaceSearchRow({
  name,
  distanceKm,
  rating,
  onPress,
}) {
  const initial = name?.charAt(0)?.toUpperCase() || "?";

  return (
    <Pressable style={styles.card} onPress={onPress}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{initial}</Text>
      </View>

      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={1}>
          {name}
        </Text>

        <Text style={styles.distance}>A {distanceKm} km</Text>
      </View>

      <View style={styles.ratingBox}>
        <Text style={styles.ratingText}>{rating}</Text>

        <RatingStars rating={rating} size={18} />
      </View>
    </Pressable>
  );
}