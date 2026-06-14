import React from "react";
import {
  ActivityIndicator,
  Pressable,
  Text,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import PhotoPreviewCard from "../PhotoPreviewCard";

import styles from "./styles";

export default function PhotosGrid({
  photos,
  maxPhotos,
  pickerLoading,
  getPhotoKey,
  onAddPhotos,
  onRemovePhoto,
}) {
  const canAddMore = photos.length < maxPhotos;

  return (
    <View style={styles.grid}>
      {photos.map((photo, index) => (
        <PhotoPreviewCard
          key={getPhotoKey(photo, index)}
          photo={photo}
          index={index}
          onRemove={() => onRemovePhoto(index)}
        />
      ))}

      {canAddMore && (
        <Pressable
          disabled={pickerLoading}
          onPress={onAddPhotos}
          style={({ pressed }) => [
            styles.addCard,
            pressed && styles.addCardPressed,
            pickerLoading && styles.addCardDisabled,
          ]}
        >
          {pickerLoading ? (
            <ActivityIndicator
              size="small"
              color="#198754"
            />
          ) : (
            <>
              <View style={styles.addIconContainer}>
                <Ionicons
                  name="add"
                  size={29}
                  color="#198754"
                />
              </View>

              <Text style={styles.addTitle}>
                Agregar fotos
              </Text>

              <Text style={styles.addDescription}>
                Galería
              </Text>
            </>
          )}
        </Pressable>
      )}
    </View>
  );
}