import React from "react";
import { Image, Pressable, Text, View } from "react-native";
import styles from "./styles";

import { icons } from "../../../../../../assets/icons";

export default function PlaceHeader({
  name,
  isOpen,
  distanceKm,
  isFavorite,
  onBack,
  onToggleFavorite,
}) {
  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <Pressable onPress={onBack} hitSlop={12} style={styles.iconButton}>
          <Image source={icons.flecha} style={styles.backIcon} />
        </Pressable>

        <View style={styles.titleBox}>
          <Text style={styles.title} numberOfLines={1}>
            {name}
          </Text>

          <View style={styles.metaRow}>
            <Text style={styles.metaText}>
              {isOpen ? "Abierto ahora" : "Cerrado"}
            </Text>

            <View style={styles.metaDot} />

            <Text style={styles.metaText}>A {distanceKm} Km</Text>
          </View>
        </View>

        <Pressable
          onPress={onToggleFavorite}
          hitSlop={12}
          style={styles.iconButton}
        >
          <Image
            source={isFavorite ? icons.redheart : icons.heart}
            style={[
              styles.heartIcon,
              isFavorite ? styles.heartFilledIcon : styles.heartOutlineIcon,
            ]}
          />
        </Pressable>
      </View>
    </View>
  );
}