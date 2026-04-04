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

export default function AddPlaceScreen() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [photos, setPhotos] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);

  const navigation = useNavigation();

  const handleGoToFilters = () => {
    navigation.navigate("FilterSectionScreen");
  };

  const handleCancel = () => {
    setName("");
    setDescription("");
    setPhotos([]);
  };

  const handleSubmit = () => {
    console.log("SUBMIT", {
      name,
      description,
      photos,
      selectedLocation,
    });
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
          name={name}
          description={description}
          onChangeName={setName}
          onChangeDescription={setDescription}
          onPressFilters={handleGoToFilters}
        />

        <PhotoPicker
          photos={photos}
          onChangePhotos={setPhotos}
        />

        <LocationMap
          selectedLocation={selectedLocation}
          onChangeLocation={setSelectedLocation}
        />

        <BottomActions onCancel={handleCancel} onSubmit={handleSubmit} />
      </View>
    </LayoutScreen>
  );
}