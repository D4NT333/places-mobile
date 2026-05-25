import React from "react";
import { View, Image } from "react-native";
import styles from "./styles";
import { icons } from "../../../assets/icons";

export default function RatingStars({ rating = 0, size = 12 }) {
  const numericRating = Number(rating) || 0;

  const fullStars = Math.floor(numericRating);
  const hasHalfStar = numericRating - fullStars >= 0.5;

  const stars = [];

  for (let i = 1; i <= 5; i++) {
    if (i <= fullStars) {
      stars.push("full");
    } else if (i === fullStars + 1 && hasHalfStar) {
      stars.push("half");
    } else {
      stars.push("empty");
    }
  }

  return (
    <View style={styles.container}>
      {stars.map((type, index) => {
        const source =
          type === "full"
            ? icons.fullstar
            : type === "half"
            ? icons.mediumstar
            : icons.emptystar;

        return (
          <Image
            key={`${type}-${index}`}
            source={source}
            style={{
              width: size,
              height: size,
              resizeMode: "contain",
            }}
          />
        );
      })}
    </View>
  );
}