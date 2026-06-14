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

const STATUS_LABELS = {
  approved: "Aprobado",
  rejected: "Rechazado",
  in_review: "En revisión",
};

export default function AddedPhotoCard({
  photo,
  onDelete,
  onViewReason,
}) {
  const [imageError, setImageError] = useState(false);

  const isRejected =
    photo.status === "rejected";

  const imageUrl =
    photo.mediumUrl ||
    photo.imageUrl ||
    "";

  const statusLabel =
    STATUS_LABELS[photo.status] ||
    "En revisión";

  useEffect(() => {
    setImageError(false);
  }, [imageUrl]);

  return (
    <View style={styles.card}>
      <View style={styles.imageBox}>
        {imageUrl && !imageError ? (
          <Image
            source={{
              uri: imageUrl,
            }}
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
          {photo.name}
        </Text>

        <Text style={styles.submittedAt}>
          {photo.submittedAtLabel}
        </Text>

        <View style={styles.divider} />

        <Text style={styles.status}>
          {statusLabel}
        </Text>

        <View style={styles.actionsRow}>
          {isRejected && (
            <Pressable
              style={styles.secondaryButton}
              onPress={() => {
                onViewReason?.(photo.id);
              }}
            >
              <Text style={styles.secondaryButtonText}>
                Ver motivo
              </Text>
            </Pressable>
          )}

          <Pressable
            style={styles.primaryButton}
            onPress={() => {
              onDelete?.(photo.id);
            }}
          >
            <Text style={styles.primaryButtonText}>
              Eliminar
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}