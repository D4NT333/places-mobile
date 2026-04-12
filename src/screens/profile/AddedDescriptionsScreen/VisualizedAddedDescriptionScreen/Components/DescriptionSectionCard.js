import React from "react";
import { Text, View } from "react-native";

import styles from "./styles";

export default function DescriptionSectionCard({ title, content }) {
  return (
    <View style={styles.section}>
      <Text style={styles.title}>{title}</Text>

      <View style={styles.contentBox}>
        <Text style={styles.contentText}>{content}</Text>
      </View>
    </View>
  );
}