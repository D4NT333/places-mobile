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

export default function AddPlaceScreen() {
  const navigation = useNavigation();
  const { draft, updateDraft, resetDraft } = useAddPlaceDraft();

  const handleGoToFilters = () => {
    navigation.navigate("FilterSectionScreen");
  };

  const handleCancel = () => {
    resetDraft();
  };

  const handleSubmit = () => {
    console.log("SUBMIT", draft);
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