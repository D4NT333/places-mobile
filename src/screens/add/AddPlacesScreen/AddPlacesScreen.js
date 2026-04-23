import React from "react";
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

import createPlaceSubmissionService from "../../../services/api/createPlaceSubmission.service";

import uploadPlaceSubmissionPhotosToStorageService   from "../../../services/firebase/storage/uploadPlaceSubmissionPhotosToStorage.service";

export default function AddPlaceScreen() {
  const navigation = useNavigation();
  const { draft, updateDraft, resetDraft } = useAddPlaceDraft();

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

  const hasCategory = !!filters.categoryId;
  const hasSubtags = Array.isArray(filters.subtags) && filters.subtags.length >= 1;
  const hasFocuses =
    !filters.hasFocuses || (Array.isArray(filters.focuses) && filters.focuses.length >= 1);

  const hasPrice = !!filters.isFree || !!filters.priceRangeId;

  const isNameValid = trimmedName.length >= 3 && trimmedName.length <= 60;
  const isDescriptionValid =
    trimmedDescription.length >= 80 && trimmedDescription.length <= 200;
  const arePhotosValid = photos.length >= 3 && photos.length <= 6;
  const isLocationValid =
    !!selectedLocation &&
    typeof selectedLocation.latitude === "number" &&
    typeof selectedLocation.longitude === "number";

  const areFiltersValid =
    hasCategory &&
    hasSubtags &&
    hasFocuses &&
    hasPrice;

  const isFormValid =
    isNameValid &&
    isDescriptionValid &&
    areFiltersValid &&
    arePhotosValid &&
    isLocationValid;

  const handleSubmit = async () => {
  if (!isFormValid) return;

  try {
    const categoryId = filters.categoryId ?? null;

    let categoryLabel = "Sin categoría";
    let selectedSubtagLabels = [];
    let selectedFocusLabels = [];
    let selectedPriceLabel = filters.isFree ? "Gratis" : "Sin rango";

    if (categoryId) {
      const [tagsData, subtagsData, approachesData] = await Promise.all([
        getTagsService(),
        getSubtagsByTagId(categoryId),
        getApproachesByTagId(categoryId),
      ]);

      const category = tagsData.find((item) => item.id === categoryId) ?? null;
      categoryLabel = category?.label ?? "Sin categoría";

      selectedSubtagLabels = subtagsData
        .filter((item) => (filters.subtags ?? []).includes(item.id))
        .map((item) => item.label);

      selectedFocusLabels = approachesData
        .filter((item) => (filters.focuses ?? []).includes(item.id))
        .map((item) => item.label);

      if (!filters.isFree) {
        const selectedRange = category?.price?.ranges?.find(
          (item) => item.id === filters.priceRangeId
        );

        if (selectedRange?.label) {
          selectedPriceLabel = selectedRange.label;
        }
      }
    }

    const submissionId = `sub_${Date.now()}`;

    const uploadedPhotos = await uploadPlaceSubmissionPhotosToStorageService ({
      photos,
      placeSubmissionId: submissionId,
    });

    const payload = {
      submissionId,
      name: trimmedName,
      description: trimmedDescription,
      category: categoryLabel,
      subtags: selectedSubtagLabels,
      focuses: selectedFocusLabels,
      price: selectedPriceLabel,
      photos: uploadedPhotos,
      location: selectedLocation
        ? {
            latitude: selectedLocation.latitude,
            longitude: selectedLocation.longitude,
          }
        : null,
    };

    console.log("========== NUEVO LUGAR ==========");
    console.log("submissionId:", payload.submissionId);
    console.log("Nombre:", payload.name);
    console.log("Descripción:", payload.description);
    console.log("Categoría:", payload.category);
    console.log("Subtags:", payload.subtags);
    console.log("Enfoques:", payload.focuses);
    console.log("Precio:", payload.price);
    console.log("Fotos subidas:", payload.photos);
    console.log("Ubicación:", payload.location);
    console.log("=================================");

    const response = await createPlaceSubmissionService(payload);
    console.log("Respuesta backend:", response);

    resetDraft();
  } catch (error) {
    console.error("Error armando submit del lugar:", error);
  }
};

  return (
    <LayoutScreen
      scroll
      edges={["top"]}
      padding={{ top: 16, left: 16, right: 16, bottom: 24 }}
      bg="#c51b1b41"
    >
      <View style={styles.container}>
        <Text style={styles.title}>Ubicación:</Text>

        <PlaceForm
          name={draft.name}
          description={draft.description}
          filters={draft.filters}
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
          submitDisabled={!isFormValid}
        />
      </View>
    </LayoutScreen>
  );
}