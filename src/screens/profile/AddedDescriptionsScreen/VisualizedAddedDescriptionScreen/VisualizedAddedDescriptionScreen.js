import React, { useCallback, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  Text,
  View,
  ScrollView,
} from "react-native";
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";

import { LayoutScreen } from "../../../../layouts";
import DescriptionSectionCard from "./Components/DescriptionSectionCard";

import getMyDescriptionSubmissionDetailService from "../../../../services/api/submissions/descriptions/read/getMyDescriptionSubmissionDetail.service";

import styles from "./styles";

const STATUS_LABELS = {
  approved: "Aprobado",
  in_review: "En revisión",
  rejected: "Rechazado",
};

function formatSubmittedAt(value) {
  if (!value) return "Sin fecha";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Sin fecha";
  }

  return date.toLocaleDateString("es-MX", {
    day: "numeric",
    month: "long",
  });
}

function normalizeDescriptionDetail(submission) {
  return {
    id: submission.id || submission.submissionId,

    placeName: submission.placeName || "Lugar sin nombre",

    status: submission.status || "in_review",

    statusLabel:
      submission.statusLabel ||
      STATUS_LABELS[submission.status] ||
      "En revisión",

    submittedAtLabel: `Enviado el ${formatSubmittedAt(
      submission.submittedAt || submission.createdAt
    )}`,

    currentDescription:
      submission.currentDescription || "Sin descripción actual.",

    proposedDescription:
      submission.proposedDescription || "Sin descripción propuesta.",

    reviewMessage: submission.reviewMessage || null,
  };
}

export default function VisualizedAddedDescriptionScreen() {
  const navigation = useNavigation();
  const route = useRoute();

  const initialDescriptionData = route.params?.descriptionData || null;
  const submissionId =
    route.params?.submissionId ||
    initialDescriptionData?.id ||
    initialDescriptionData?.submissionId;

  const [descriptionDetail, setDescriptionDetail] = useState(
    initialDescriptionData
  );
  const [loading, setLoading] = useState(!initialDescriptionData);
  const [errorMessage, setErrorMessage] = useState("");

  const normalizedDetail = useMemo(() => {
    if (!descriptionDetail) return null;

    return normalizeDescriptionDetail(descriptionDetail);
  }, [descriptionDetail]);

  const loadDescriptionDetail = useCallback(async () => {
    try {
      if (!submissionId) {
        throw new Error("No se encontró el id de la descripción.");
      }

      setLoading(true);
      setErrorMessage("");

      const result = await getMyDescriptionSubmissionDetailService(
        submissionId
      );

      setDescriptionDetail(result);
    } catch (error) {
      setErrorMessage(
        error.message || "No se pudo cargar el detalle de la descripción."
      );
    } finally {
      setLoading(false);
    }
  }, [submissionId]);

  useFocusEffect(
    useCallback(() => {
      loadDescriptionDetail();
    }, [loadDescriptionDetail])
  );

  const handleClose = () => {
    navigation.goBack();
  };

  if (loading) {
    return (
      <LayoutScreen
        edges={["top"]}
        padding={{ top: 16, left: 16, right: 16, bottom: 24 }}
        bg="#FFFFFF"
      >
        <View style={styles.screen}>
          <View style={styles.headerRow}>
            <Pressable
              onPress={handleClose}
              style={styles.closeButton}
              hitSlop={12}
            >
              <Text style={styles.closeText}>X</Text>
            </Pressable>

            <Text style={styles.placeName} numberOfLines={1}>
              Cargando
            </Text>

            <View />
          </View>

          <View style={styles.loadingBox}>
            <ActivityIndicator size="large" />
            <Text style={styles.loadingText}>Cargando descripción...</Text>
          </View>
        </View>
      </LayoutScreen>
    );
  }

  if (errorMessage || !normalizedDetail) {
    return (
      <LayoutScreen
        edges={["top"]}
        padding={{ top: 16, left: 16, right: 16, bottom: 24 }}
        bg="#FFFFFF"
      >
        <View style={styles.screen}>
          <View style={styles.headerRow}>
            <Pressable
              onPress={handleClose}
              style={styles.closeButton}
              hitSlop={12}
            >
              <Text style={styles.closeText}>X</Text>
            </Pressable>

            <Text style={styles.placeName} numberOfLines={1}>
              Error
            </Text>

            <View />
          </View>

          <Text style={styles.descriptionIntro}>
            {errorMessage || "No se pudo cargar la descripción."}
          </Text>
        </View>
      </LayoutScreen>
    );
  }

  return (
    <LayoutScreen
      edges={["top"]}
      padding={{ top: 16, left: 16, right: 16, bottom: 24 }}
      bg="#FFFFFF"
    >
      <View style={styles.screen}>
        <View style={styles.headerRow}>
          <Pressable
            onPress={handleClose}
            style={styles.closeButton}
            hitSlop={12}
          >
            <Text style={styles.closeText}>X</Text>
          </Pressable>

          <Text style={styles.placeName} numberOfLines={1}>
            {normalizedDetail.placeName}
          </Text>

          <Text style={styles.statusText} numberOfLines={1}>
            {normalizedDetail.statusLabel}
          </Text>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.content}
        >
          <Text style={styles.submittedAt}>
            {normalizedDetail.submittedAtLabel}
          </Text>

          <Text style={styles.descriptionIntro}>
            Comparación entre la descripción actual del lugar y la descripción
            que propusiste.
          </Text>

          <View style={styles.divider} />

          <DescriptionSectionCard
            title="Descripción actual"
            content={normalizedDetail.currentDescription}
          />

          <DescriptionSectionCard
            title="Descripción propuesta"
            content={normalizedDetail.proposedDescription}
          />

          <View style={styles.bottomSpace} />
        </ScrollView>
      </View>
    </LayoutScreen>
  );
}