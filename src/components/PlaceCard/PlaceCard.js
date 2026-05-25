import React from "react";
import { View, Text, Image } from "react-native";
import styles from "./styles";
import RatingStars from "../RatingStars";

export default function PlaceCard({ item, variant = "short" }) {
  const isTall = variant === "tall";

  const tags = item.tags ?? ["Etiqueta", "Subetiqueta", "Subetiqueta"];
  const rating = item.rating ?? 3.3;
  const distanceKm = item.distanceKm ?? "x";

  return (
    <View style={[styles.card, isTall ? styles.tallCard : styles.shortCard]}>
      {item.photoUrl ? (
        <Image
          source={{ uri: item.photoUrl }}
          style={[
            styles.placeImage,
            isTall ? styles.tallImage : styles.shortImage,
          ]}
        />
      ) : (
        <View
          style={[
            styles.imagePlaceholder,
            isTall ? styles.tallImage : styles.shortImage,
          ]}
        >
          <Text style={styles.imagePlaceholderText}>Foto</Text>
        </View>
      )}

      <View style={styles.infoBox}>
        <Text style={styles.title} numberOfLines={1}>
          {item.title}
        </Text>

        <View style={styles.tagsRow}>
          {tags.slice(0, 3).map((tag, index) => (
            <View style={styles.tag} key={`${tag}-${index}`}>
              <Text style={styles.tagText} numberOfLines={1}>
                {tag}
              </Text>
            </View>
          ))}
        </View>

        <Text style={styles.ratingNumber}>
          {rating}
        </Text>

        <View style={styles.bottomRow}>
          <Text style={styles.distance}>
            A {distanceKm} km
          </Text>

          <RatingStars rating={rating} size={18} />
        </View>
      </View>
    </View>
  );
}