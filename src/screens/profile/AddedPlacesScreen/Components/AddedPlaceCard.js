import React from "react";
import { Image, Pressable, Text, View } from "react-native";

import styles from "./styles";

function getStatusLabel(status) {
  switch (status) {
    case "approved":
      return "Aprobado";
    case "in_review":
      return "En revisión";
    case "returned":
      return "Devuelto";
    case "rejected":
      return "Rechazado";
    default:
      return "Pendiente";
  }
}

function getDateLabel(place) {
  if (place.status === "returned" && place.returnedAtLabel) {
    return place.returnedAtLabel;
  }

  return place.submittedAtLabel;
}

function getActions(status) {
  switch (status) {
    case "approved":
      return ["delete"];

    case "in_review":
      return [];

    case "returned":
      return ["edit", "delete"];

    case "rejected":
      return ["reason", "delete"];

    default:
      return ["delete"];
  }
}

export default function AddedPlaceCard({
  place,
  onPressCard,
  onEdit,
  onDelete,
  onViewReason,
}) {
  const statusLabel = getStatusLabel(place.status);
  const dateLabel = getDateLabel(place);
  const actions = getActions(place.status);
  const chips = [place.tag, ...(place.subtags || [])].slice(0, 3);

  const isPressable = place.status === "approved";
  const Container = isPressable ? Pressable : View;

  return (
    <Container
      style={styles.card}
      onPress={isPressable ? () => onPressCard?.(place) : undefined}
    >
      <View style={styles.topRow}>
        <Image
          source={{ uri: place.imageUrl }}
          style={styles.image}
          resizeMode="cover"
        />

        <View style={styles.infoContainer}>
          <Text style={styles.name} numberOfLines={1}>
            {place.name}
          </Text>

          <View style={styles.chipsRow}>
            {chips.map((chip, index) => (
              <View key={`${chip}-${index}`} style={styles.chip}>
                <Text style={styles.chipText} numberOfLines={1}>
                  {chip}
                </Text>
              </View>
            ))}
          </View>

          <View style={styles.metaRow}>
            <Text style={styles.dateText} numberOfLines={1}>
              {dateLabel}
            </Text>

            <Text style={styles.statusText}>{statusLabel}</Text>
          </View>
        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.actionsRow}>
        {actions.includes("reason") ? (
          <Pressable
            style={styles.actionButton}
            onPress={() => onViewReason?.(place)}
          >
            <Text style={styles.actionButtonText}>Ver motivo</Text>
          </Pressable>
        ) : null}

        {actions.includes("edit") ? (
          <Pressable
            style={styles.actionButton}
            onPress={() => onEdit?.(place)}
          >
            <Text style={styles.actionButtonText}>Editar</Text>
          </Pressable>
        ) : null}

        {actions.includes("delete") ? (
          <Pressable
            style={styles.actionButton}
            onPress={() => onDelete?.(place)}
          >
            <Text style={styles.actionButtonText}>Eliminar</Text>
          </Pressable>
        ) : null}
      </View>
    </Container>
  );
}