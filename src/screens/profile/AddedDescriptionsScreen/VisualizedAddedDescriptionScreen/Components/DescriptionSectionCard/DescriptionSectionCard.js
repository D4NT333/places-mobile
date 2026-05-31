import React from "react";
import { Text, View } from "react-native";

import styles from "./styles";

export default function DescriptionSectionCard({
  title,
  content,
  showCounter = true,
}) {
  const characterCount = content?.length || 0;

  return (
    <View style={styles.section}>
      <Text style={styles.title}>{title}</Text>

      <View style={styles.box}>
        <Text style={styles.content}>{content}</Text>
      </View>

      {showCounter && (
        <Text style={styles.counter}>
          {characterCount} caracteres
        </Text>
      )}
    </View>
  );
}