import React from "react";
import { Pressable, Text, View } from "react-native";

import styles from "./styles";

export default function EditablePhotosBox({ label, photos = [], onPress }) {
  return (
    <View style={styles.section}>
      <Text style={styles.label}>{label}</Text>

      <Pressable style={styles.photosBox} onPress={onPress}>
        {photos.map((photo) => (
          <View key={photo.id} style={styles.photoItem}>
            <Text style={styles.photoTitle}>{photo.label}</Text>

            <View style={styles.photoPlaceholder} />

            <Text style={styles.photoHelper}>texto</Text>
          </View>
        ))}
      </Pressable>
    </View>
  );
}