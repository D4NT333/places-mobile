import React from "react";
import { Pressable, Text, View } from "react-native";

import styles from "./styles";

const STATUS_LABELS = {
  approved: "Aprobado",
  in_review: "En revisión",
  returned: "Devuelto",
  rejected: "Rechazado",
};

export default function AddedDescriptionCard({
  item,
  onDelete,
  onEdit,
  onViewReason,
}) {
  const isApproved = item.status === "approved";
  const isInReview = item.status === "in_review";
  const isReturned = item.status === "returned";
  const isRejected = item.status === "rejected";

  return (
    <View style={styles.card}>
      <View style={styles.topRow}>
        <View style={styles.imageCircle}>
          <Text style={styles.imageText}>Imagen</Text>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.name} numberOfLines={1}>
            {item.name}
          </Text>

          <Text style={styles.description} numberOfLines={1}>
            {item.description}
          </Text>

          <Text style={styles.submittedAt}>{item.submittedAtLabel}</Text>
        </View>
      </View>

      <View style={styles.bottomSection}>
        <View style={styles.divider} />

        <View style={styles.statusRow}>
          <Text style={styles.statusText}>{STATUS_LABELS[item.status]}</Text>
        </View>

        {!isInReview && (
          <View style={styles.actionsRow}>
            {isRejected && (
              <Pressable
                style={styles.button}
                onPress={() => onViewReason?.(item.id)}
              >
                <Text style={styles.buttonText}>Ver motivo</Text>
              </Pressable>
            )}

            {isReturned && (
              <Pressable
                style={styles.button}
                onPress={() => onEdit?.(item.id)}
              >
                <Text style={styles.buttonText}>Editar</Text>
              </Pressable>
            )}

            {(isApproved || isReturned || isRejected) && (
              <Pressable
                style={styles.button}
                onPress={() => onDelete?.(item.id)}
              >
                <Text style={styles.buttonText}>Eliminar</Text>
              </Pressable>
            )}
          </View>
        )}
      </View>
    </View>
  );
}