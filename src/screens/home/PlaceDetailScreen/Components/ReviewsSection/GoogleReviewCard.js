import React from "react";
import { Text, View } from "react-native";
import styles from "./styles";

import RatingStars from "../../../../../components/RatingStars";

export default function GoogleReviewCard({ review }) {
  return (
    <View style={styles.googleCard}>
      <View style={styles.googleHeaderRow}>
        <Text style={styles.googleLabel}>Google</Text>
        <RatingStars rating={review.rating} size={15} />
        <Text style={styles.googleRating}>{review.rating}</Text>
      </View>

      <Text style={styles.googleComment} numberOfLines={1}>
        {review.comment}
      </Text>
    </View>
  );
}