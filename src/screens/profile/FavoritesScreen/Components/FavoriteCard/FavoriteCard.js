import React from "react";
import { Pressable, Text, View } from "react-native";
import styles from "./styles";

export default function FavoriteCard({
  name,
  rating,
  distanceKm,
  onPress,
  onPressHeart,
}) {
  return (
    <Pressable onPress={onPress} style={styles.card}>
      {/* Imagen mock */}
      <View style={styles.avatar}>
        <Text style={styles.avatarTxt}>IMG</Text>
      </View>

      {/* Info */}
      <View style={styles.info}>
        <Text numberOfLines={1} style={styles.name}>
          {name}
        </Text>

        <View style={styles.metaRow}>
          <Text style={styles.meta}>Valoración {rating.toFixed(1)}</Text>
          <Text style={styles.meta}>A {distanceKm.toFixed(1)} km</Text>
        </View>
      </View>

      {/* Heart */}
      <Pressable onPress={onPressHeart} hitSlop={10} style={styles.heartBtn}>
        <Text style={styles.heart}>♥</Text>
      </Pressable>
    </Pressable>
  );
}
