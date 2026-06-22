import React from "react";
import { View, Text, Pressable, Image } from "react-native";

import styles from "./styles";
import DescriptionStatusPill from "../DescriptionStatusPill";

const STATUS_LABELS = {
  approved: "Aprobado",
  in_review: "En revisión",
  rejected: "Rechazado",
};

export default function AddedDescriptionCard({
  item,
  onPressCard,
  onDelete,
  onEdit,
  onViewReason,
}) {

  const canDelete = true
  const canViewReason = item.status === "rejected";

  return (
    <Pressable
      onPress={() => onPressCard(item)}
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
    >
      <View style={styles.mainRow}>
        <View style={styles.imageCircle}>
          {item.imageUrl ? (
            <Image source={{ uri: item.imageUrl }} style={styles.image} />
          ) : (
            <Text style={styles.imageText}>IMG</Text>
          )}
        </View>

        <View style={styles.info}>
          <Text numberOfLines={1} style={styles.name}>
            {item.name}
          </Text>

          <Text numberOfLines={1} style={styles.description}>
            {item.description}
          </Text>

          <View style={styles.metaRow}>
  <Text
    style={styles.date}
    numberOfLines={1}
  >
    {item.submittedAtLabel}
  </Text>

  <DescriptionStatusPill status={item.status} />
</View>
        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.actionsRow}>
        {canViewReason && (
          <Pressable
            onPress={() => onViewReason(item.id)}
            style={({ pressed }) => [
              styles.actionButton,
              pressed && styles.actionPressed,
            ]}
          >
            <Text style={styles.actionText}>Ver motivo</Text>
          </Pressable>
        )}

        {canDelete && (
          <Pressable
            onPress={() => onDelete(item.id)}
            style={({ pressed }) => [
              styles.actionButton,
              pressed && styles.actionPressed,
            ]}
          >
            <Text style={styles.actionText}>Eliminar</Text>
          </Pressable>
        )}
      </View>
    </Pressable>
  );
}