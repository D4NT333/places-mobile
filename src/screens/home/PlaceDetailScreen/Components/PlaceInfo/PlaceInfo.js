import React from "react";
import { Pressable, Text, View } from "react-native";
import styles from "./styles";

import RatingStars from "../../../../../components/RatingStars";

function RatingCard({ label, rating }) {
  return (
    <View style={styles.ratingCard}>
      <Text style={styles.ratingLabel}>{label}</Text>

      <View style={styles.ratingRow}>
        <Text style={styles.ratingNumber}>{rating}</Text>
        <RatingStars rating={rating} size={16} />
      </View>
    </View>
  );
}

export default function PlaceInfo({
  description,
  googleRating,
  lsearchRating,
  tags,
  canSubmitDescription = true,
  onImproveDescription,
}) {
  return (
    <View>
      <Text style={styles.sectionTitle}>Descripción</Text>

      <Text style={styles.descriptionText}>{description}</Text>

      {canSubmitDescription === false ? (
        <Text style={styles.descriptionReviewText}>
          Descripción en revisión
        </Text>
      ) : (
        <Pressable
          onPress={onImproveDescription}
          style={({ pressed }) => [
            styles.improveDescriptionButton,
            pressed && styles.improveDescriptionButtonPressed,
          ]}
        >
          <Text style={styles.improveDescriptionText}>
            Mejorar descripción
          </Text>
        </Pressable>
      )}

      <Text style={[styles.sectionTitle, styles.spacedTitle]}>
        Valoraciones
      </Text>

      <View style={styles.ratingsRow}>
        <RatingCard label="Google" rating={googleRating} />
        <RatingCard label="Lsearch" rating={lsearchRating} />
      </View>

      <Text style={[styles.sectionTitle, styles.spacedTitle]}>
        Categorías
      </Text>

      <View style={styles.tagsRow}>
        {tags.map((tag, index) => (
          <View key={`${tag}-${index}`} style={styles.tagChip}>
            <Text style={styles.tagText}>{tag}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}