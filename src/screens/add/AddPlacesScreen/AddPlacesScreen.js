import React, { useMemo, useState } from "react";
import { View, Text } from "react-native";
import { LayoutScreen } from "../../../layouts";
import { useNavigation } from "@react-navigation/native";

import styles from "./styles";

import {PlaceForm, PhotoPicker, LocationMap, BottomActions} from "./Components";

export default function AddPlaceScreen() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const navigation = useNavigation();

  const handleGoToFilters = () => {
  navigation.navigate("FilterSectionScreen");
  };

  const handleCancel = () => {
    // placeholder: aquí luego navegas back o limpias
    setName("");
    setDescription("");
    setFilters([]);
  };

  const handleSubmit = () => {
    // placeholder: aquí luego llamas tu backend / firestore
    console.log("SUBMIT", { name, description, filters });
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

        <PhotoPicker />

        <LocationMap />

        <BottomActions onCancel={handleCancel} onSubmit={handleSubmit} />
      </View>
    </LayoutScreen>
  );
}
