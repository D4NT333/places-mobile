import React from "react";
import { View, Text, Pressable } from "react-native";
import styles from "./styles";

function Stars({ rating = 0 }) {
  const full = Math.floor(rating);
  const hasHalf = rating - full >= 0.5;
  const total = 5;

  const stars = Array.from({ length: total }).map((_, i) => {
    if (i < full) return "★";
    if (i === full && hasHalf) return "★"; // simple: no half star char
    return "☆";
  });

  return <Text style={styles.stars}>{stars.join(" ")}</Text>;
}

export default function PlaceInfo({
  name,
  distanceKm,
  description,
  rating,
  reviewsCount,
  tags = [],
  onImproveDescription,
}) {
  return (
    <View style={styles.card}>
      <View style={styles.rowTop}>
        <Text style={styles.title} numberOfLines={2}>
          {name}
        </Text>
        <Text style={styles.distance}>{distanceKm ? `A ${distanceKm} km` : ""}</Text>
      </View>

      <Text style={styles.desc}>{description}</Text>

      <Pressable
        onPress={onImproveDescription}
        style={({ pressed }) => [styles.improveBtn, pressed && styles.improveBtnPressed]}
        hitSlop={10}
      >
        <Text style={styles.improveBtnText}>¿Colocar una mejor descripción?</Text>
      </Pressable>

      <View style={styles.ratingRow}>
        <Text style={styles.ratingText}>{rating?.toFixed?.(1) ?? rating}</Text>
        <Stars rating={rating} />
        <Text style={styles.reviews}>{reviewsCount ? `(${reviewsCount})` : ""}</Text>
      </View>

      <View style={styles.tagsWrap}>
        {tags.map((t) => (
          <View key={t} style={styles.tag}>
            <Text style={styles.tagText}>{t}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}
