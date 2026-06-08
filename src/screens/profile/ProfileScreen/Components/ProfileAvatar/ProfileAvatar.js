import React from "react";
import { Image, Text, View } from "react-native";

import styles from "./styles";

function getInitial(name) {
  const cleanName = typeof name === "string" ? name.trim() : "";

  if (!cleanName) return "?";

  return cleanName.charAt(0).toUpperCase();
}

export default function ProfileAvatar({ name, photoURL }) {
  if (photoURL) {
    return (
      <Image
        source={{ uri: photoURL }}
        style={styles.image}
        resizeMode="cover"
      />
    );
  }

  return (
    <View style={styles.circle}>
      <Text style={styles.initial}>{getInitial(name)}</Text>
    </View>
  );
}