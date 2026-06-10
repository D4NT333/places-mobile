import React, { useCallback, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Pressable,
  RefreshControl,
  ScrollView,
  Text,
  View,
} from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

import { LayoutScreen } from "../../../layouts";
import { icons } from "../../../../assets/icons";

import AddedDescriptionCard from "./Components/AddedDescriptionCard";

import getMyDescriptionSubmissionsService from "../../../services/api/submissions/descriptions/read/getMyDescriptionSubmissions.service";

import styles from "./styles";

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

function normalizeDescriptionItem(item) {
  return {
    id: item.id || item.submissionId,

    name: item.placeName || "Lugar sin nombre",

    description:
      item.descriptionPreview ||
      item.proposedDescription ||
      "Sin descripción propuesta.",

    proposedDescription: item.proposedDescription || "",
    currentDescription: item.currentDescription || "",

    submittedAtLabel: `Enviado el ${formatSubmittedAt(item.createdAt)}`,

    status: item.status || "in_review",
    statusLabel: item.statusLabel,

    imageUrl: item.imageUrl || null,

    reviewMessage: item.reviewMessage || null,
    canDelete: Boolean(item.canDelete),
  };
}

export default function AddedDescriptionsScreen() {
  const navigation = useNavigation();

  const [descriptions, setDescriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const loadDescriptions = useCallback(async ({ showRefresh = false } = {}) => {
    try {
      if (showRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      setErrorMessage("");

      const result = await getMyDescriptionSubmissionsService();

      const normalizedItems = result.map(normalizeDescriptionItem);

      setDescriptions(normalizedItems);
    } catch (error) {
      setErrorMessage(
        error.message || "No se pudieron cargar tus descripciones."
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadDescriptions();
    }, [loadDescriptions])
  );

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handlePressCard = (item) => {
    navigation.navigate("VisualizedAddedDescriptionScreen", {
      descriptionData: {
        id: item.id,
        placeName: item.name,
        status: item.status,
        submittedAtLabel: item.submittedAtLabel,
        currentDescription: item.currentDescription,
        proposedDescription: item.proposedDescription || item.description,
        reviewMessage: item.reviewMessage,
        imageUrl: item.imageUrl,
      },
    });
  };

  const handleDelete = (descriptionId) => {
    console.log("Eliminar descripcion:", descriptionId);
  };

  const handleEdit = (descriptionId) => {
    console.log("Editar descripcion:", descriptionId);
  };

  const handleViewReason = (descriptionId) => {
    const item = descriptions.find((description) => description.id === descriptionId);

    navigation.navigate("VisualizedAddedDescriptionScreen", {
      descriptionData: {
        id: item.id,
        placeName: item.name,
        status: item.status,
        submittedAtLabel: item.submittedAtLabel,
        currentDescription: item.currentDescription,
        proposedDescription: item.proposedDescription || item.description,
        reviewMessage: item.reviewMessage,
        imageUrl: item.imageUrl,
      },
    });
  };

  return (
    <LayoutScreen
      scroll={false}
      edges={["top"]}
      padding={{ top: 16, left: 16, right: 16, bottom: 0 }}
      bg="#FFFFFF"
    >
      <View style={styles.screen}>
        <View style={styles.header}>
          <Pressable
            onPress={handleGoBack}
            style={styles.backButton}
            hitSlop={12}
          >
            <Image source={icons.flecha} style={styles.backIcon} />
          </Pressable>

          <Text style={styles.headerTitle}>Descripciones añadidas</Text>

          <View style={styles.headerSpacer} />
        </View>

        <Text style={styles.subtitle}>
          Revisa el estado de las descripciones que has propuesto para distintos
          lugares.
        </Text>

        {loading ? (
          <View style={styles.loadingBox}>
            <ActivityIndicator size="large" />
            <Text style={styles.loadingText}>Cargando descripciones...</Text>
          </View>
        ) : (
          <ScrollView
            contentContainerStyle={styles.content}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={() => loadDescriptions({ showRefresh: true })}
              />
            }
          >
            {errorMessage ? (
              <View style={styles.emptyBox}>
                <Text style={styles.emptyTitle}>No se pudieron cargar</Text>
                <Text style={styles.emptyText}>{errorMessage}</Text>
              </View>
            ) : descriptions.length === 0 ? (
              <View style={styles.emptyBox}>
                <Text style={styles.emptyTitle}>
                  Aún no has añadido descripciones
                </Text>
                <Text style={styles.emptyText}>
                  Cuando propongas una mejora de descripción, aparecerá aquí.
                </Text>
              </View>
            ) : (
              descriptions.map((item) => (
                <AddedDescriptionCard
                  key={item.id}
                  item={item}
                  onPressCard={handlePressCard}
                  onDelete={handleDelete}
                  onEdit={handleEdit}
                  onViewReason={handleViewReason}
                />
              ))
            )}

            <View style={styles.bottomSpace} />
          </ScrollView>
        )}
      </View>
    </LayoutScreen>
  );
}