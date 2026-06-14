import React from "react";
import { Image, Pressable, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import styles from "./styles";

export default function PhotoPreviewCard({
  photo,
  index,
  onRemove,
}) {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: photo.uri }}
        style={styles.image}
        resizeMode="cover"
      />

      <View style={styles.overlay} />

      <View style={styles.positionBadge}>
        <Text style={styles.positionText}>
          {index + 1}
        </Text>
      </View>

      <Pressable
        onPress={onRemove}
        hitSlop={8}
        style={({ pressed }) => [
          styles.removeButton,
          pressed && styles.removeButtonPressed,
        ]}
      >
        <Ionicons
          name="close"
          size={18}
          color="#FFFFFF"
        />
      </Pressable>
    </View>
  );
}