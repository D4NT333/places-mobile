import React from "react";
import { Image, Pressable, View } from "react-native";
import styles from "./styles";
import { icons } from "../../../assets/icons";

export default function RatingStarsPicker({
  value = 0,
  onChange,
  size = 48,
  gap = 14,
  disabled = false,
}) {
  const numericValue = Number(value) || 0;

  const getStarType = (starNumber) => {
    if (numericValue >= starNumber) return "full";
    if (numericValue >= starNumber - 0.5) return "half";
    return "empty";
  };

  const getStarSource = (type) => {
    if (type === "full") return icons.fullstar;
    if (type === "half") return icons.mediumstar;
    return icons.emptystar;
  };

  const handlePressStar = (event, starIndex) => {
    if (disabled) return;

    const locationX = event.nativeEvent.locationX;
    const selectedValue =
      locationX <= size / 2 ? starIndex + 0.5 : starIndex + 1;

    onChange?.(selectedValue);
  };

  return (
    <View style={[styles.container, { gap }]}>
      {[0, 1, 2, 3, 4].map((starIndex) => {
        const starNumber = starIndex + 1;
        const type = getStarType(starNumber);

        return (
          <Pressable
            key={starIndex}
            disabled={disabled}
            onPress={(event) => handlePressStar(event, starIndex)}
            hitSlop={8}
            style={[
              styles.starButton,
              {
                width: size,
                height: size,
                opacity: disabled ? 0.45 : 1,
              },
            ]}
          >
            <Image
              source={getStarSource(type)}
              style={{
                width: size,
                height: size,
                resizeMode: "contain",
              }}
            />
          </Pressable>
        );
      })}
    </View>
  );
}