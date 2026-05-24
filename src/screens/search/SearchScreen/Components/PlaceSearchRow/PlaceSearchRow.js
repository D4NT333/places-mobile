import React from "react";
import { View, Text, Pressable, Image } from "react-native";
import styles from "./styles";
import { icons } from "../../../../../../assets/icons";

export default function PlaceSearchRow({
  name,
  distanceKm,
  rating,
  onPress,
}) {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <View style={styles.photoCircle}>
        <Text style={styles.photoInitial}>
          {name?.charAt(0)?.toUpperCase() ?? "L"}
        </Text>
      </View>

      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={1}>
          {name}
        </Text>

        <Text style={styles.distance}>
          A {distanceKm} km
        </Text>
      </View>

      <View style={styles.ratingBox}>
        <Text style={styles.ratingText}>{rating}</Text>

        {/* Luego aquí cambias icons.closedeye por tu estrella */}
        <Image
          source={icons.closedeye}
          style={styles.starIcon}
        />
      </View>
    </Pressable>
  );
}