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

export default function AddPlaceScreen() {
  const navigation = useNavigation();
  const { draft, updateDraft, resetDraft } = useAddPlaceDraft();

  const handleGoToFilters = () => {
    navigation.navigate("FilterSectionScreen");
  };

  const handleCancel = () => {
    resetDraft();
  };

  const handleSubmit = async () => {
    try {
      const filters = draft.filters ?? {};
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

      const payload = {
        name: draft.name?.trim() || "",
        description: draft.description?.trim() || "",
        category: categoryLabel,
        subtags: selectedSubtagLabels,
        focuses: selectedFocusLabels,
        price: selectedPriceLabel,
        photos: draft.photos ?? [],
        location: draft.selectedLocation
          ? {
              latitude: draft.selectedLocation.latitude,
              longitude: draft.selectedLocation.longitude,
            }
          : null,
      };

      console.log("========== NUEVO LUGAR ==========");
      console.log("Nombre:", payload.name);
      console.log("Descripción:", payload.description);
      console.log("Categoría:", payload.category);
      console.log("Subtags:", payload.subtags);
      console.log("Enfoques:", payload.focuses);
      console.log("Precio:", payload.price);
      console.log("Fotos:", payload.photos);
      console.log("Ubicación:", payload.location);
      console.log("=================================");

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
          photos={draft.photos}
          onChangePhotos={(value) => updateDraft({ photos: value })}
        />

        <LocationMap
          selectedLocation={draft.selectedLocation}
          onChangeLocation={(value) => updateDraft({ selectedLocation: value })}
        />

        <BottomActions
          onCancel={handleCancel}
          onSubmit={handleSubmit}
        />
      </View>
    </LayoutScreen>
  );
}