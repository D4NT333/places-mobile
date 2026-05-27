import React from "react";
import { Pressable, Text, View } from "react-native";
import styles from "./styles";

import RatingStars from "../../../../../components/RatingStars";

export default function ReviewCard({ review }) {
  return (
    <View style={styles.reviewCard}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>
          {review.userName?.charAt(0)?.toUpperCase() ?? "U"}
        </Text>
      </View>

      <View style={styles.reviewContent}>
        <Text style={styles.reviewUser}>{review.userName}</Text>

        <View style={styles.reviewMetaRow}>
          <RatingStars rating={review.rating} size={17} />

          <Text style={styles.recommendDot}>●</Text>

          <Text style={styles.recommendText}>
            {review.recommends ? "Lo recomienda" : "No lo recomienda"}
          </Text>
        </View>

        <View style={styles.reviewBottomRow}>
          <Text style={styles.commentText} numberOfLines={1}>
            {review.comment}
          </Text>

          <Pressable>
            <Text style={styles.detailText}>Ver detalles</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}