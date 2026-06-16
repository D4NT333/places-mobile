import React, {
  useMemo,
} from "react";

import {
  Text,
  View,
} from "react-native";

import styles from "./styles";

const STATUS_CONFIG = {
  in_review: {
    label: "En revisión",
    backgroundColor: "#FFF7ED",
    borderColor: "#FDBA74",
    textColor: "#C2410C",
  },

  approved: {
    label: "Aprobada",
    backgroundColor: "#ECFDF5",
    borderColor: "#6EE7B7",
    textColor: "#047857",
  },

  rejected: {
    label: "Rechazada",
    backgroundColor: "#FEF2F2",
    borderColor: "#FCA5A5",
    textColor: "#B91C1C",
  },
};

function normalizeChipLabel(value) {
  if (typeof value === "string") {
    return value.trim();
  }

  if (!value || typeof value !== "object") {
    return "";
  }

  return (
    value.label ||
    value.name ||
    value.subtagLabel ||
    value.approachLabel ||
    ""
  ).trim();
}

function formatSubmittedAt(
  createdAt,
  submittedAtLabel
) {
  if (
    typeof submittedAtLabel ===
      "string" &&
    submittedAtLabel.trim()
  ) {
    return submittedAtLabel.trim();
  }

  if (!createdAt) {
    return "Fecha de envío no disponible";
  }

  const date = new Date(createdAt);

  if (Number.isNaN(date.getTime())) {
    return "Fecha de envío no disponible";
  }

  const formattedDate =
    date.toLocaleDateString(
      "es-MX",
      {
        day: "numeric",
        month: "long",
        year: "numeric",
      }
    );

  return `Enviado el ${formattedDate}`;
}

export default function PhotoSubmissionInfo({
  placeName,
  status,
  createdAt,
  submittedAtLabel,
  tagLabel,
  subtags = [],
  approaches = [],
}) {
  const statusConfig =
    STATUS_CONFIG[status] ||
    STATUS_CONFIG.in_review;

  const chips = useMemo(() => {
    const rawChips = [
      tagLabel,
      ...subtags,
      ...approaches,
    ];

    const normalizedChips = rawChips
      .map(normalizeChipLabel)
      .filter(Boolean);

    return [
      ...new Set(normalizedChips),
    ];
  }, [
    tagLabel,
    subtags,
    approaches,
  ]);

  const dateLabel =
    formatSubmittedAt(
      createdAt,
      submittedAtLabel
    );

  return (
    <View style={styles.container}>
      <View style={styles.titleRow}>
        <Text
          style={styles.placeName}
          numberOfLines={2}
        >
          {placeName}
        </Text>

        <View
          style={[
            styles.statusChip,
            {
              backgroundColor:
                statusConfig.backgroundColor,

              borderColor:
                statusConfig.borderColor,
            },
          ]}
        >
          <Text
            style={[
              styles.statusText,
              {
                color:
                  statusConfig.textColor,
              },
            ]}
          >
            {statusConfig.label}
          </Text>
        </View>
      </View>

      <Text style={styles.submittedAt}>
        {dateLabel}
      </Text>

      {chips.length > 0 && (
        <View style={styles.chipsContainer}>
          {chips.map(
            (chip, index) => (
              <View
                key={`${chip}-${index}`}
                style={styles.infoChip}
              >
                <Text
                  style={
                    styles.infoChipText
                  }
                >
                  {chip}
                </Text>
              </View>
            )
          )}
        </View>
      )}
    </View>
  );
}