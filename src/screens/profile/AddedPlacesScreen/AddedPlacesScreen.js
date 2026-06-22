import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";

import {
  useFocusEffect,
  useNavigation,
} from "@react-navigation/native";

import { auth } from "../../../services/firebase/config";

import { LayoutScreen } from "../../../layouts";

import AddedPlaceCard from "./Components/AddedPlaceCard";
import DeleteSubmissionModal from "./Components/DeleteSubmissionModal";
import RejectionReasonModal from "./Components/RejectionReasonModal";


import {
  getAddedPlacesCacheSnapshot,
  loadMoreAddedPlacesSubmissions,
  refreshAddedPlacesSubmissions,
  removeAddedPlaceFromCache,
  subscribeAddedPlacesCache,
  clearAddedPlacesSubmissionsCache,
} from "../../../services/api/submissions/places/read/addedPlacesSubmissionsCache.service";

import { getRejectedPlaceReasonService } from "../../../services";

import requestDeleteSubmissionService from "../../../services/api/submissions/requestDeleteSubmission.service";

import styles from "./styles";

import {icons} from "../../../../assets/icons";

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
    subtags: Array.isArray(submission.subtags)
      ? submission.subtags
      : [],
    submittedAtLabel: formatDateLabel(
      submission.createdAt,
      "Enviado"
    ),
    returnedAtLabel: formatDateLabel(
      submission.returnedAt,
      "Devuelto"
    ),
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

  const [deleteModalVisible, setDeleteModalVisible] =
    useState(false);
  const [selectedPlaceToDelete, setSelectedPlaceToDelete] =
    useState(null);
  const [deletingSubmission, setDeletingSubmission] =
    useState(false);

  const [rejectionModalVisible, setRejectionModalVisible] =
    useState(false);
  const [loadingRejectionReason, setLoadingRejectionReason] =
    useState(false);
  const [rejectionReasonError, setRejectionReasonError] =
    useState("");
  const [selectedRejectionReason, setSelectedRejectionReason] =
    useState(null);

  useEffect(() => {
    const unsubscribe = subscribeAddedPlacesCache(
      (nextSnapshot) => {
        setCacheSnapshot(nextSnapshot);
      }
    );

    return unsubscribe;
  }, []);

  useFocusEffect(
    useCallback(() => {
      const uid = auth.currentUser?.uid || null;

      if (!uid) {
        clearAddedPlacesSubmissionsCache();
        setCacheSnapshot(getAddedPlacesCacheSnapshot());
        return;
      }

      setCacheSnapshot(getAddedPlacesCacheSnapshot());

      refreshAddedPlacesSubmissions().catch((error) => {
        console.log(
          "Error refrescando lugares añadidos:",
          error
        );
      });
    }, [auth.currentUser?.uid])
  );

  const places = useMemo(
    () => cacheSnapshot.items.map(mapSubmissionToPlace),
    [cacheSnapshot.items]
  );

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

  const handleCancelDelete = () => {
    if (deletingSubmission) return;

    setDeleteModalVisible(false);
    setSelectedPlaceToDelete(null);
  };

  const handleConfirmDelete = async () => {
    if (!selectedPlaceToDelete?.id) return;
    if (deletingSubmission) return;

    try {
      setDeletingSubmission(true);

      const result = await requestDeleteSubmissionService({
        type: "place",
        submissionId: selectedPlaceToDelete.id,
      });

      console.log("Lugar enviado a eliminación:", result);

      removeAddedPlaceFromCache(selectedPlaceToDelete.id);

      setDeleteModalVisible(false);
      setSelectedPlaceToDelete(null);
    } catch (error) {
      console.log(
        "Error enviando lugar a eliminación:",
        error
      );

      alert(
        error?.response?.data?.message ||
          error?.message ||
          "No se pudo enviar el lugar a eliminación."
      );
    } finally {
      setDeletingSubmission(false);
    }
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
      console.log(
        "Error cargando motivo de rechazo:",
        error
      );

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
    const {
      layoutMeasurement,
      contentOffset,
      contentSize,
    } = event.nativeEvent;

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
        console.log(
          "Error al cargar más lugares añadidos:",
          error
        );
      });
    }
  };

  const isEmpty =
    !cacheSnapshot.loadingInitial && places.length === 0;

  return (
    <LayoutScreen
      padding={{
        top: 18,
        left: 22,
        right: 22,
        bottom: 0,
      }}
      bg="#F4F6FB"
      edges={["top"]}
    >
      <View style={styles.screen}>
        <View style={styles.headerContainer}>
          <View style={styles.titleRow}>
            <Pressable
              onPress={handleGoBack}
              style={styles.backButton}
              hitSlop={12}
            >
              <Image
                source={icons.flecha}
                style={styles.flecha}
                resizeMode="contain"
              />
            </Pressable>

            <Text style={styles.title}>
              Lugares añadidos
            </Text>
          </View>

          <Text style={styles.helperText}>
            Revisa el estado de los lugares que has enviado.
          </Text>
        </View>

        {cacheSnapshot.loadingInitial ? (
          <View style={styles.centerState}>
            <ActivityIndicator size="large" />
            <Text style={styles.centerStateText}>
              Cargando lugares...
            </Text>
          </View>
        ) : null}

        {isEmpty ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyTitle}>
              Aún no has enviado lugares
            </Text>

            <Text style={styles.emptyText}>
              Cuando propongas un lugar, aparecerá aquí con su
              estado de revisión.
            </Text>
          </View>
        ) : null}

        {!cacheSnapshot.loadingInitial && places.length > 0 ? (
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

            {cacheSnapshot.loadingMore ? (
              <View style={styles.loadingMore}>
                <ActivityIndicator />
                <Text style={styles.loadingMoreText}>
                  Cargando más...
                </Text>
              </View>
            ) : null}
          </ScrollView>
        ) : null}
      </View>

      <DeleteSubmissionModal
        visible={deleteModalVisible}
        title="Eliminar lugar"
        itemName={
          selectedPlaceToDelete?.name || "este lugar"
        }
        loading={deletingSubmission}
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