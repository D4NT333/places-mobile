import React, { useState } from "react";
import { View, Text } from "react-native";
import { LayoutScreen } from "../../../layouts";
import { useNavigation } from "@react-navigation/native";

import styles from "./styles";
import {
  PlaceForm,
  PhotoPicker,
  LocationMap,
  BottomActions,
} from "./Components";

import { useAddPlaceDraft } from "../../../context/AddPlaceDraftContext";

import { getTagsService } from "../../../services/firebase/firestore/tags/getTags.service";
import { getSubtagsByTagId } from "../../../services/firebase/firestore/subtags/getSubtagsByTagId.service";
import { getApproachesByTagId } from "../../../services/firebase/firestore/approaches/getApproachesByTagId.service";

import createPlaceSubmissionService from "../../../services/api/submissions/places/create/createPlaceSubmission.service";

import uploadPlaceSubmissionPhotosToStorageService from "../../../services/firebase/storage/placesubmission/uploadPlaceSubmissionPhotosToStorage.service";

import LoadingOverlay from "../../../components/LoadingOverlay";

export default function AddPlaceScreen() {
  const navigation = useNavigation();
  const { draft, updateDraft, resetDraft } = useAddPlaceDraft();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitFinished, setSubmitFinished] = useState(false);
  const [overlayTitle, setOverlayTitle] = useState("Subiendo lugar...");
  const [overlayMessage, setOverlayMessage] = useState(
    "Estamos cargando las fotos y registrando tu propuesta."
  );

  const handleGoToFilters = () => {
    navigation.navigate("FilterSectionScreen");
  };

  const handleCancel = () => {
    resetDraft();
  };

  const trimmedName = draft.name?.trim() ?? "";
  const trimmedDescription = draft.description?.trim() ?? "";

  const filters = draft.filters ?? {};
  const photos = draft.photos ?? [];
  const selectedLocation = draft.selectedLocation ?? null;

  const tagId = filters.tagId ?? filters.categoryId ?? null;

  const hasTag = !!tagId;
  const hasSubtags =
    Array.isArray(filters.subtags) && filters.subtags.length >= 1;
  const hasFocuses =
    !filters.hasFocuses ||
    (Array.isArray(filters.focuses) && filters.focuses.length >= 1);

  const hasPrice = !!filters.isFree || !!filters.priceRangeId;

  const hasOpeningHours = !!filters.openingHours?.type;

const firstThreeNameCharsRegex = /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ]{3}/;

const isNameValid =
  trimmedName.length >= 3 &&
  trimmedName.length <= 30 &&
  firstThreeNameCharsRegex.test(trimmedName);

  const nameError =
  trimmedName.length > 0 && trimmedName.length < 3
    ? "El nombre debe tener al menos 3 caracteres"
    : trimmedName.length > 30
      ? "El nombre no puede tener más de 30 caracteres"
      : trimmedName.length >= 3 && !firstThreeNameCharsRegex.test(trimmedName)
        ? "Los primeros 3 caracteres no pueden ser números ni caracteres especiales"
        : "";

  const isDescriptionValid =
    trimmedDescription.length >= 80 && trimmedDescription.length <= 200;
  const arePhotosValid = photos.length >= 3 && photos.length <= 6;
  const isLocationValid =
    !!selectedLocation &&
    typeof selectedLocation.latitude === "number" &&
    typeof selectedLocation.longitude === "number";

  const areFiltersValid =
  hasTag &&
  hasSubtags &&
  hasFocuses &&
  hasPrice &&
  hasOpeningHours;

  const isFormValid =
    isNameValid &&
    isDescriptionValid &&
    areFiltersValid &&
    arePhotosValid &&
    isLocationValid;

  const handleSubmit = async () => {
    if (!isFormValid || isSubmitting) return;

    try {
      setIsSubmitting(true);
      setSubmitFinished(false);
      setOverlayTitle("Subiendo lugar...");
      setOverlayMessage(
        "Estamos cargando las fotos y registrando tu propuesta."
      );

      let tagLabel =
        filters.tagLabel ??
        filters.categoryLabel ??
        "Sin etiqueta";

      let selectedSubtagLabels = Array.isArray(filters.subtagLabels)
        ? filters.subtagLabels
        : [];

      let selectedFocusLabels = Array.isArray(filters.focusLabels)
        ? filters.focusLabels
        : [];

      let selectedPriceLabel =
        filters.priceLabel ??
        (filters.isFree ? "Gratis" : "Sin rango");

      const needsFallbackData =
        tagId &&
        (
          !tagLabel ||
          tagLabel === "Sin etiqueta" ||
          selectedSubtagLabels.length === 0 ||
          (!filters.isFree && selectedPriceLabel === "Sin rango")
        );

      if (needsFallbackData) {
        const [tagsData, subtagsData, approachesData] = await Promise.all([
          getTagsService(),
          getSubtagsByTagId(tagId),
          getApproachesByTagId(tagId),
        ]);

        const tag = tagsData.find((item) => item.id === tagId) ?? null;

        if (!tagLabel || tagLabel === "Sin etiqueta") {
          tagLabel = tag?.label ?? "Sin etiqueta";
        }

        if (selectedSubtagLabels.length === 0) {
          selectedSubtagLabels = subtagsData
            .filter((item) => (filters.subtags ?? []).includes(item.id))
            .map((item) => item.label);
        }

        if (selectedFocusLabels.length === 0) {
          selectedFocusLabels = approachesData
            .filter((item) => (filters.focuses ?? []).includes(item.id))
            .map((item) => item.label);
        }

        if (!filters.isFree && selectedPriceLabel === "Sin rango") {
          const ranges =
            tag?.priceConfig?.ranges ??
            tag?.price?.ranges ??
            [];

          const selectedRange = ranges.find(
            (item) => item.id === filters.priceRangeId
          );

          if (selectedRange?.label) {
            selectedPriceLabel = selectedRange.label;
          }
        }
      }

      const placeSubmissionId = `place_sub_${Date.now()}`;

      const uploadedPhotos = await uploadPlaceSubmissionPhotosToStorageService({
        photos,
        placeSubmissionId,
      });

      const payload = {
        placeSubmissionId,
        name: trimmedName,
        description: trimmedDescription,

        tagId,
        tagLabel,

        subtags: selectedSubtagLabels,
        approaches: selectedFocusLabels,
        price: selectedPriceLabel,

        openingHours: filters.openingHours ?? {
        type: "not_specified",
        days: [],
        openTime: null,
        closeTime: null,
        label: "Horario no especificado",
      },

        photos: uploadedPhotos,
        location: selectedLocation
          ? {
              latitude: selectedLocation.latitude,
              longitude: selectedLocation.longitude,
            }
          : null,
      };

      console.log("PAYLOAD PLACE SUBMISSION:", payload);

      const response = await createPlaceSubmissionService(payload);
      console.log("Respuesta backend:", response);

      setSubmitFinished(true);
      setOverlayTitle("Lugar enviado");
      setOverlayMessage("Tu propuesta fue enviada correctamente a revisión.");

      setTimeout(() => {
        setIsSubmitting(false);
        setSubmitFinished(false);
        resetDraft();
      }, 1400);
    } catch (error) {
      console.error("Error armando submit del lugar:", error);

      setSubmitFinished(true);
      setOverlayTitle("No se pudo enviar");
      setOverlayMessage("Ocurrió un error al subir el lugar. Intenta de nuevo.");

      setTimeout(() => {
        setIsSubmitting(false);
        setSubmitFinished(false);
      }, 1700);
    }
  };

  return (
    <LayoutScreen
      scroll
      edges={["top"]}
      padding={{ top: 4, left: 16, right: 16, bottom: 24 }}
      bg="#F6F7FB"
    >
      <View style={styles.container}>
        <Text style={styles.title}>Agregar lugar</Text>
        <Text style={styles.subtitle}>
          Comparte establecimientos, espacios o lugares de interés que valga la pena conocer.
        </Text>

        <PlaceForm
          name={draft.name}
          description={draft.description}
          filters={draft.filters}
          nameError={nameError}
          onChangeName={(value) => updateDraft({ name: value })}
          onChangeDescription={(value) => updateDraft({ description: value })}
          onPressFilters={handleGoToFilters}
        />

        <PhotoPicker
          photos={photos}
          onChangePhotos={(value) => updateDraft({ photos: value })}
        />

        <LocationMap
          selectedLocation={selectedLocation}
          onChangeLocation={(value) => updateDraft({ selectedLocation: value })}
        />

        <BottomActions
          onCancel={handleCancel}
          onSubmit={handleSubmit}
          submitDisabled={!isFormValid || isSubmitting}
          isSubmitting={isSubmitting}
        />

        <LoadingOverlay
          visible={isSubmitting}
          loading={!submitFinished}
          title={overlayTitle}
          message={overlayMessage}
        />
      </View>
    </LayoutScreen>
  );
}