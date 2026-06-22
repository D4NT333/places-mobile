import React from "react";
import { Text, View } from "react-native";

import styles from "./styles";

const STATUS_MAP = {
  in_review: {
    label: "En revisión",
    pill: styles.pendingPill,
    text: styles.pendingText,
  },

  approved: {
    label: "Aprobado",
    pill: styles.approvedPill,
    text: styles.approvedText,
  },

  rejected: {
    label: "Rechazado",
    pill: styles.rejectedPill,
    text: styles.rejectedText,
  },
};

export default function DescriptionStatusPill({ status }) {
  const config =
    STATUS_MAP[status] || STATUS_MAP.in_review;

  return (
    <View style={[styles.pill, config.pill]}>
      <Text
        style={[styles.text, config.text]}
        numberOfLines={1}
      >
        {config.label}
      </Text>
    </View>
  );
}