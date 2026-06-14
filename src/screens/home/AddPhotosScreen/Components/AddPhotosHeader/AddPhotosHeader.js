import React from "react";
import { Pressable, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import styles from "./styles";

export default function AddPhotosHeader({ placeName, onBack }) {
  return (
    <View style={styles.container}>
      <Pressable
        onPress={onBack}
        hitSlop={12}
        style={({ pressed }) => [
          styles.backButton,
          pressed && styles.backButtonPressed,
        ]}
      >
        <Ionicons
          name="chevron-back"
          size={25}
          color="#17191E"
        />
      </Pressable>

      <View style={styles.textContainer}>
        <Text style={styles.title}>Agregar fotos</Text>

        <Text
          style={styles.placeName}
          numberOfLines={1}
        >
          {placeName}
        </Text>
      </View>

      <View style={styles.rightPlaceholder} />
    </View>
  );
}