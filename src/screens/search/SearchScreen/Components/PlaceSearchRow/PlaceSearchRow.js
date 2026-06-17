import React from "react";

import {
  Pressable,
  Text,
  View,
} from "react-native";

import RatingStars from "../../../../../components/RatingStars";

import SearchPlaceImage from "../SearchPlaceImage";

import styles from "./styles";

function normalizeRating(value) {
  const parsedRating =
    Number(value);

  if (
    !Number.isFinite(parsedRating) ||
    parsedRating < 0
  ) {
    return 0;
  }

  return Math.min(
    parsedRating,
    5
  );
}

function formatDistance(value) {
  const parsedDistance =
    Number(value);

  if (
    !Number.isFinite(parsedDistance) ||
    parsedDistance < 0
  ) {
    return "";
  }

  if (parsedDistance < 1) {
    return `A ${Math.round(
      parsedDistance * 1000
    )} m`;
  }

  return `A ${parsedDistance.toFixed(
    1
  )} km`;
}

export default function PlaceSearchRow({
  name,
  address,
  distanceKm,
  rating,
  mainPhoto,
  onPress,
}) {
  const safeName =
    typeof name === "string" &&
    name.trim()
      ? name.trim()
      : "Lugar sin nombre";

  const safeRating =
    normalizeRating(rating);

  const distanceLabel =
    formatDistance(distanceKm);

  const secondaryText =
    distanceLabel ||
    address ||
    "Sin dirección disponible";

  return (
    <Pressable
      style={({ pressed }) => [
        styles.card,
        pressed &&
          styles.cardPressed,
      ]}
      onPress={onPress}
    >
      <SearchPlaceImage
        mainPhoto={mainPhoto}
        placeName={safeName}
        style={styles.photo}
        fallbackStyle={styles.avatar}
        fallbackTextStyle={
          styles.avatarText
        }
      />

      <View style={styles.info}>
        <Text
          style={styles.name}
          numberOfLines={1}
        >
          {safeName}
        </Text>

        <Text
          style={styles.distance}
          numberOfLines={1}
        >
          {secondaryText}
        </Text>
      </View>

      <View style={styles.ratingBox}>
        <Text style={styles.ratingText}>
          {safeRating.toFixed(1)}
        </Text>

        <RatingStars
          rating={safeRating}
          size={18}
        />
      </View>
    </Pressable>
  );
}