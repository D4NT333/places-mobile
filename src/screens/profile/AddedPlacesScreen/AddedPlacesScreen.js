import { Pressable, ScrollView, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";

import { LayoutScreen } from "../../../layouts";
import AddedPlaceCard from "./Components/AddedPlaceCard";
import DeletePlaceModal from "./Components/DeletePlaceModal";
import RejectionReasonModal from "./Components/RejectionReasonModal";

import {
  getAddedPlacesCacheSnapshot,
  loadMoreAddedPlacesSubmissions,
  preloadAddedPlacesSubmissions,
  removeAddedPlaceFromCache,
  subscribeAddedPlacesCache,
} from "../../../services/api/addedPlacesSubmissionsCache.service";

import {getRejectedPlaceReasonService } from "../../../services";

import styles from "./styles";

function formatDateLabel(dateValue, prefix = "Enviado") {
  if (!dateValue) return `${prefix} recientemente`;

  const date = new Date(dateValue);

  if (Number.isNaN(date.getTime())) {
    return `${prefix} recientemente`;
  }

  const months = [
    "enero",
    "febrero",
    "marzo",
    "abril",
    "mayo",
    "junio",
    "julio",
    "agosto",
    "septiembre",
    "octubre",
    "noviembre",
    "diciembre",
  ];

  const day = date.getDate();
  const month = months[date.getMonth()];

  return `${prefix} el ${day} de ${month}`;
}



function mapSubmissionToPlace(submission) {
  return {
    id: submission.id,
    name: submission.name || "Lugar sin nombre",
    imageUrl:
      submission.imageUrl ||
      "https://via.placeholder.com/200x200.png?text=Lugar",
    tag: submission.tag || submission.tagLabel || "Sin categoría",
    subtags: Array.isArray(submission.subtags) ? submission.subtags : [],
    submittedAtLabel: formatDateLabel(submission.createdAt, "Enviado"),
    returnedAtLabel: formatDateLabel(submission.returnedAt, "Devuelto"),
    resubmittedAtLabel: formatDateLabel(
      submission.resubmittedAt || submission.updatedAt,
      "Corregido"
    ),
    status: submission.status || "in_review",
  };
}

export default function AddedPlacesScreen() {
  const navigation = useNavigation();

  const [cacheSnapshot, setCacheSnapshot] = useState(
    getAddedPlacesCacheSnapshot()
  );

  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [selectedPlaceToDelete, setSelectedPlaceToDelete] = useState(null);

  const [rejectionModalVisible, setRejectionModalVisible] = useState(false);
  const [loadingRejectionReason, setLoadingRejectionReason] = useState(false);
  const [rejectionReasonError, setRejectionReasonError] = useState("");
  const [selectedRejectionReason, setSelectedRejectionReason] = useState(null);

  useEffect(() => {
    const unsubscribe = subscribeAddedPlacesCache((nextSnapshot) => {
      setCacheSnapshot(nextSnapshot);
    });

    preloadAddedPlacesSubmissions().catch((error) => {
      console.log("Error al cargar lugares añadidos:", error);
    });

    return unsubscribe;
  }, []);

  const places = cacheSnapshot.items.map(mapSubmissionToPlace);

  const handleCancelDelete = () => {
    setDeleteModalVisible(false);
    setSelectedPlaceToDelete(null);
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handlePressCard = (place) => {
  navigation.navigate("VisualizedAddedPlacesScreen", {
    placeId: place.id,
    initialPlace: place,
    });
  };

  const handleEdit = (place) => {
  navigation.navigate("EditAddedPlacesScreen", {
    placeId: place.id,
    initialPlace: place,
    source: "added_places",
    shouldFetchReturnedEditData: true,
  });
  };

  const handleDelete = (place) => {
    setSelectedPlaceToDelete(place);
    setDeleteModalVisible(true);
  };
  
  const handleConfirmDelete = () => {
  if (!selectedPlaceToDelete) return;

  console.log("Lugar eliminado:", selectedPlaceToDelete.id);

  removeAddedPlaceFromCache(selectedPlaceToDelete.id);

  setDeleteModalVisible(false);
  setSelectedPlaceToDelete(null);
};

  const handleViewReason = async (place) => {
  setRejectionModalVisible(true);
  setLoadingRejectionReason(true);
  setRejectionReasonError("");
  setSelectedRejectionReason(null);

  try {
    const data = await getRejectedPlaceReasonService(place.id);

    console.log("Motivo de rechazo:", data);

    setSelectedRejectionReason(data);
  } catch (error) {
    console.log("Error cargando motivo de rechazo:", error);

    setRejectionReasonError(
      error.response?.data?.message ||
        error.message ||
        "No se pudo cargar el motivo de rechazo."
    );
  } finally {
    setLoadingRejectionReason(false);
  }
};

  const handleScroll = (event) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;

    const visibleHeight = layoutMeasurement.height;
    const scrollY = contentOffset.y;
    const contentHeight = contentSize.height;

    const scrollPosition = visibleHeight + scrollY;
    const threshold = contentHeight * 0.8;

    const shouldLoadMore = scrollPosition >= threshold;

    if (
      shouldLoadMore &&
      cacheSnapshot.hasMore &&
      !cacheSnapshot.loadingMore &&
      !cacheSnapshot.loadingInitial
    ) {
      loadMoreAddedPlacesSubmissions().catch((error) => {
        console.log("Error al cargar más lugares añadidos:", error);
      });
    }
  };

  return (
    <LayoutScreen
      padding={{ top: 16, left: 16, right: 16, bottom: 16 }}
      bg="#538de4ff"
      edges={["top"]}
    >
      <View style={styles.card}>
        <View style={styles.headerContainer}>
          <View style={styles.titleRow}>
            <Pressable onPress={handleGoBack} style={styles.backButton}>
              <Text style={styles.backIcon}>←</Text>
            </Pressable>

            <Text style={styles.title}>Lugares añadidos</Text>
          </View>

          <Text style={styles.helperText}>
            Si es aprobado lo toca y lo lleva a la card del lugar nuevo
          </Text>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
          onScroll={handleScroll}
          scrollEventThrottle={16}
        >
          {places.map((place) => (
            <AddedPlaceCard
              key={place.id}
              place={place}
              onPressCard={handlePressCard}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onViewReason={handleViewReason}
            />
          ))}
        </ScrollView>
      </View>

      <DeletePlaceModal
        visible={deleteModalVisible}
        placeName={selectedPlaceToDelete?.name || "este lugar"}
        onCancel={handleCancelDelete}
        onConfirm={handleConfirmDelete}
      />

      <RejectionReasonModal
        visible={rejectionModalVisible}
        loading={loadingRejectionReason}
        errorMessage={rejectionReasonError}
        rejectionReason={selectedRejectionReason}
        onClose={() => {
          setRejectionModalVisible(false);
          setSelectedRejectionReason(null);
          setRejectionReasonError("");
        }}
      />
    </LayoutScreen>
  );
}