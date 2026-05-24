import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import styles from "./styles";
import {icons} from "../../../../../../assets/icons";

export default function FavoriteCard({
  name,
  rating,
  tag,
  subtag,
  imageUrl,
  onPress,
  onPressHeart,
}) {
  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.85}
      onPress={onPress}
    >
      <View style={styles.imageBox}>
        {imageUrl ? (
          <Image source={{ uri: imageUrl }} style={styles.image} />
        ) : (
          <Text style={styles.imageText}>IMG</Text>
        )}
      </View>

      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={1}>
          {name}
        </Text>

        <View style={styles.tagsRow}>
          {!!tag && (
            <View style={styles.chip}>
              <Text style={styles.chipText} numberOfLines={1}>
                {tag}
              </Text>
            </View>
          )}

          {!!subtag && (
            <View style={styles.chip}>
              <Text style={styles.chipText} numberOfLines={1}>
                {subtag}
              </Text>
            </View>
          )}
        </View>

        <Text style={styles.rating}>Valoración {rating}</Text>
      </View>

      <TouchableOpacity
        style={styles.heartButton}
        activeOpacity={0.75}
        onPress={onPressHeart}
      >
        <Image source={icons.redheart} style={styles.heartIcon} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
}