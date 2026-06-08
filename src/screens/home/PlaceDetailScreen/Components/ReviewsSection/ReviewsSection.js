import React from "react";
import { Pressable, Text, View } from "react-native";
import styles from "./styles";

import RatingStars from "../../../../../components/RatingStars";
import ReviewCard from "./ReviewCard";
import GoogleReviewCard from "./GoogleReviewCard";

function toNumber(value, fallback = 0) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function normalizeSummary(summary = {}) {
  return {
    rating: toNumber(summary.rating ?? summary.averageRating, 0),
    reviewsCount: toNumber(
      summary.reviewsCount ?? summary.ratingsCount,
      0
    ),
    recommendationPercent: toNumber(
      summary.recommendationPercent ?? summary.recommendsPercent,
      0
    ),
  };
}

function RatingSummary({ rating, size = 22 }) {
  const cleanRating = toNumber(rating, 0);

  return (
    <View style={styles.ratingSummaryRow}>
      <RatingStars rating={cleanRating} size={size} />
      <Text style={styles.ratingSummaryNumber}>
        {cleanRating.toFixed(1)}
      </Text>
    </View>
  );
}

export default function ReviewsSection({
  lsearchSummary,
  googleSummary,
  currentUserReview = null,
  lsearchReviews = [],
  googleReviews = [],
  canAddReview = true,
  onAddReview,
  onViewMoreLsearch,
  onViewMoreGoogle,
}) {
  const normalizedLsearchSummary = normalizeSummary(lsearchSummary);
  const normalizedGoogleSummary = normalizeSummary(googleSummary);

  const visibleLsearchReviews = Array.isArray(lsearchReviews)
    ? lsearchReviews.slice(0, 3)
    : [];

  const firstGoogleReview = Array.isArray(googleReviews)
    ? googleReviews[0]
    : null;

  const hasCurrentUserReview = Boolean(currentUserReview);

  return (
    <View style={styles.container}>
      <Text style={styles.mainTitle}>Reseñas</Text>

      <Text style={styles.sourceTitle}>Lsearch</Text>

      <RatingSummary rating={normalizedLsearchSummary.rating} size={22} />

      <Text style={styles.summaryText}>
        <Text style={styles.boldText}>
          {normalizedLsearchSummary.reviewsCount} reseñas
        </Text>{" "}
        {normalizedLsearchSummary.recommendationPercent}% lo recomienda
      </Text>

      {canAddReview ? (
        <Pressable onPress={onAddReview} style={styles.addReviewButton}>
          <Text style={styles.addReviewText}>Agregar reseña</Text>
        </Pressable>
      ) : null}

      {hasCurrentUserReview ? (
        <View style={styles.currentReviewSection}>
          <Text style={styles.reviewGroupTitle}>Tu reseña</Text>
          <ReviewCard review={currentUserReview} />
        </View>
      ) : null}

      <View style={styles.otherReviewsSection}>
        <Text style={styles.reviewGroupTitle}>Reseñas recientes</Text>

        {visibleLsearchReviews.length > 0 ? (
          <View style={styles.reviewsList}>
            {visibleLsearchReviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </View>
        ) : (
          <View style={styles.emptyBox}>
            <Text style={styles.emptyTitle}>
              {hasCurrentUserReview
                ? "Todavía no hay más reseñas."
                : "Todavía no hay reseñas."}
            </Text>
            <Text style={styles.emptyText}>
              {hasCurrentUserReview
                ? "Cuando otros usuarios compartan su experiencia, aparecerán aquí."
                : "Sé el primero en compartir tu experiencia."}
            </Text>
          </View>
        )}
      </View>

      <Pressable onPress={onViewMoreLsearch}>
        <Text style={styles.moreText}>Ver más reseñas</Text>
      </Pressable>

      <View style={styles.divider} />

      <Text style={styles.sourceTitle}>Google</Text>

      <View style={styles.googleSummaryRow}>
        <RatingSummary rating={normalizedGoogleSummary.rating} size={22} />
        <Text style={styles.googleReviewCount}>
          ● {normalizedGoogleSummary.reviewsCount} reseñas
        </Text>
      </View>

      {firstGoogleReview && <GoogleReviewCard review={firstGoogleReview} />}

      <Pressable onPress={onViewMoreGoogle}>
        <Text style={styles.moreGoogleText}>Ver más en Google Maps</Text>
      </Pressable>
    </View>
  );
}