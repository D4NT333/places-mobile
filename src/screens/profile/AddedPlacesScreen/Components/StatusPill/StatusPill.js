import React from "react";
import { Text, View } from "react-native";

import styles from "./styles";

const STATUS_MAP = {
  in_review: {
    label: "Pendiente",
    pill: styles.pendingPill,
    text: styles.pendingText,
  },

  returned: {
    label: "Devuelto",
    pill: styles.returnedPill,
    text: styles.returnedText,
  },

  resubmitted: {
    label: "Corregido",
    pill: styles.resubmittedPill,
    text: styles.resubmittedText,
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

export default function StatusPill({ status }) {
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