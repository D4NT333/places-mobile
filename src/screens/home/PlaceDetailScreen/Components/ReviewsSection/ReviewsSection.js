import React from "react";
import { Pressable, Text, View } from "react-native";
import styles from "./styles";

import RatingStars from "../../../../../components/RatingStars";
import ReviewCard from "./ReviewCard";
import GoogleReviewCard from "./GoogleReviewCard";

function RatingSummary({ rating, size = 22 }) {
  return (
    <View style={styles.ratingSummaryRow}>
      <RatingStars rating={rating} size={size} />
      <Text style={styles.ratingSummaryNumber}>{rating}</Text>
    </View>
  );
}

export default function ReviewsSection({
  lsearchSummary,
  googleSummary,
  lsearchReviews = [],
  googleReviews = [],
  onAddReview,
  onViewMoreLsearch,
  onViewMoreGoogle,
}) {
  const firstLsearchReview = lsearchReviews[0];
  const firstGoogleReview = googleReviews[0];

  return (
    <View style={styles.container}>
      <Text style={styles.mainTitle}>Reseñas</Text>

      <Text style={styles.sourceTitle}>Lsearch</Text>

      <RatingSummary rating={lsearchSummary.rating} size={22} />

      <Text style={styles.summaryText}>
        <Text style={styles.boldText}>{lsearchSummary.reviewsCount} reseñas</Text>{" "}
        {lsearchSummary.recommendationPercent}% lo recomienda
      </Text>

      <Pressable onPress={onAddReview} style={styles.addReviewButton}>
        <Text style={styles.addReviewText}>Agregar reseña</Text>
      </Pressable>

      {firstLsearchReview ? (
        <ReviewCard review={firstLsearchReview} />
      ) : (
        <View style={styles.emptyBox}>
          <Text style={styles.emptyTitle}>Todavía no hay reseñas.</Text>
          <Text style={styles.emptyText}>
            Sé el primero en compartir tu experiencia.
          </Text>
        </View>
      )}

      <Pressable onPress={onViewMoreLsearch}>
        <Text style={styles.moreText}>Ver más reseñas</Text>
      </Pressable>

      <View style={styles.divider} />

      <Text style={styles.sourceTitle}>Google</Text>

      <View style={styles.googleSummaryRow}>
        <RatingSummary rating={googleSummary.rating} size={22} />
        <Text style={styles.googleReviewCount}>
          ● {googleSummary.reviewsCount} reseñas
        </Text>
      </View>

      {firstGoogleReview && <GoogleReviewCard review={firstGoogleReview} />}

      <Pressable onPress={onViewMoreGoogle}>
        <Text style={styles.moreGoogleText}>Ver más en Google Maps</Text>
      </Pressable>
    </View>
  );
}