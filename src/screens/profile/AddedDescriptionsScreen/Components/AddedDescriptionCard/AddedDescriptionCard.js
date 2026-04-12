import React from "react";
import { Pressable, Text, View } from "react-native";
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

export default function AddedDescriptionCard({
  item,
  onPressCard,
  onDelete,
  onEdit,
  onViewReason,
}) {
  const statusLabel = getStatusLabel(item.status);
  const actions = getActions(item.status);

  return (
    <Pressable style={styles.card} onPress={() => onPressCard?.(item)}>
      <View style={styles.content}>
        <Text style={styles.name} numberOfLines={1}>
          {item.name}
        </Text>

        <Text style={styles.description} numberOfLines={2}>
          {item.description}
        </Text>

        <View style={styles.metaRow}>
          <Text style={styles.dateText} numberOfLines={1}>
            {item.submittedAtLabel}
          </Text>

          <Text style={styles.statusText}>{statusLabel}</Text>
        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.actionsRow}>
        {actions.includes("reason") ? (
          <Pressable
            style={styles.actionButton}
            onPress={(event) => {
              event.stopPropagation();
              onViewReason?.(item.id);
            }}
          >
            <Text style={styles.actionButtonText}>Ver motivo</Text>
          </Pressable>
        ) : null}

        {actions.includes("edit") ? (
          <Pressable
            style={styles.actionButton}
            onPress={(event) => {
              event.stopPropagation();
              onEdit?.(item.id);
            }}
          >
            <Text style={styles.actionButtonText}>Editar</Text>
          </Pressable>
        ) : null}

        {actions.includes("delete") ? (
          <Pressable
            style={styles.actionButton}
            onPress={(event) => {
              event.stopPropagation();
              onDelete?.(item.id);
            }}
          >
            <Text style={styles.actionButtonText}>Eliminar</Text>
          </Pressable>
        ) : null}
      </View>
    </Pressable>
  );
}