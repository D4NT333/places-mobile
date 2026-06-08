import React, { useState } from "react";
import { Image, Pressable, Text, View } from "react-native";
import styles from "./styles";

import RatingStars from "../../../../../components/RatingStars";

function toNumber(value, fallback = 0) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function cleanText(value) {
  return typeof value === "string" ? value.trim() : "";
}

export default function ReviewCard({ review }) {
  const [imageError, setImageError] = useState(false);

  const userName =
    cleanText(review?.userName) ||
    cleanText(review?.name) ||
    cleanText(review?.username) ||
    "Usuario";

  const userPhoto =
    cleanText(review?.userPhoto) ||
    cleanText(review?.photoUrl) ||
    cleanText(review?.avatar) ||
    cleanText(review?.picture);

  const rating = toNumber(review?.rating, 0);

  const recommended =
    typeof review?.recommended === "boolean"
      ? review.recommended
      : Boolean(review?.recommends);

  const comment =
    cleanText(review?.commentText) ||
    cleanText(review?.comment) ||
    cleanText(review?.message) ||
    "Sin comentario adicional.";

  const showImage = Boolean(userPhoto) && !imageError;

  return (
    <View style={styles.reviewCard}>
      <View style={styles.avatar}>
        {showImage ? (
          <Image
            source={{ uri: userPhoto }}
            style={styles.avatarImage}
            onError={() => setImageError(true)}
          />
        ) : (
          <Text style={styles.avatarText}>
            {userName.charAt(0).toUpperCase()}
          </Text>
        )}
      </View>

      <View style={styles.reviewContent}>
        <Text style={styles.reviewUser}>{userName}</Text>

        <View style={styles.reviewMetaRow}>
          <RatingStars rating={rating} size={17} />

          <Text style={styles.recommendDot}>●</Text>

          <Text style={styles.recommendText}>
            {recommended ? "Lo recomienda" : "No lo recomienda"}
          </Text>
        </View>

        <View style={styles.reviewBottomRow}>
          <Text style={styles.commentText} numberOfLines={1}>
            {comment}
          </Text>

          <Pressable>
            <Text style={styles.detailText}>Ver detalles</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}