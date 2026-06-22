import React, {
  useEffect,
  useState,
} from "react";

import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import styles from "./styles";
import PhotoStatusPill from "../PhotoStatusPill";

export default function AddedPhotoCard({
  photo,
  onPress,
  onDelete,
  onViewReason,
}) {
  const [imageError, setImageError] =
    useState(false);

  const submissionId =
    photo.submissionId ||
    photo.id;

  const isRejected =
    photo.status === "rejected";

  const imageUrl =
    photo.mediumUrl ||
    photo.imageUrl ||
    "";

  const placeName =
    photo.name ||
    photo.placeName ||
    "Lugar sin nombre";

  const submittedAtLabel =
    photo.submittedAtLabel ||
    "Sin fecha";

  useEffect(() => {
    setImageError(false);
  }, [imageUrl]);

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        pressed && styles.cardPressed,
      ]}
    >
      <View style={styles.imageBox}>
        {imageUrl && !imageError ? (
          <Image
            source={{ uri: imageUrl }}
            style={StyleSheet.absoluteFillObject}
            resizeMode="cover"
            onError={() => {
              setImageError(true);
            }}
          />
        ) : (
          <Text style={styles.imageText}>
            Imagen
          </Text>
        )}
      </View>

      <View style={styles.infoSection}>
        <Text
          style={styles.name}
          numberOfLines={1}
        >
          {placeName}
        </Text>

        <View style={styles.metaRow}>
          <Text
            style={styles.submittedAt}
            numberOfLines={1}
          >
            {submittedAtLabel}
          </Text>

          <PhotoStatusPill status={photo.status} />
        </View>

        <View style={styles.divider} />

        <View style={styles.actionsRow}>
          {isRejected ? (
            <Pressable
              style={styles.secondaryButton}
              onPress={(event) => {
                event.stopPropagation();
                onViewReason?.(submissionId);
              }}
            >
              <Text style={styles.secondaryButtonText}>
                Ver motivo
              </Text>
            </Pressable>
          ) : null}

          <Pressable
            style={styles.primaryButton}
            onPress={(event) => {
              event.stopPropagation();
              onDelete?.(submissionId);
            }}
          >
            <Text style={styles.primaryButtonText}>
              Eliminar
            </Text>
          </Pressable>
        </View>
      </View>
    </Pressable>
  );
}