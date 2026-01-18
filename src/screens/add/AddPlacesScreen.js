import React, { useMemo, useState } from "react";
import { View, Text } from "react-native";
import { LayoutScreen } from "../../layouts";

import styles from "./styles";

import {LocationToggle,PlaceForm, PhotoPicker, LocationMap, BottomActions} from "./Components";

export default function AddPlaceScreen() {
  const [locationMode, setLocationMode] = useState("city"); // "city" | "outside"
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [filters, setFilters] = useState([]); // array de strings

  const availableFilters = useMemo(
    () => ["Café", "Bar", "Familiar", "Pet-friendly", "Económico", "Premium"],
    []
  );

  const toggleFilter = (label) => {
    setFilters((prev) =>
      prev.includes(label) ? prev.filter((f) => f !== label) : [...prev, label]
    );
  };

  const handleCancel = () => {
    // placeholder: aquí luego navegas back o limpias
    setName("");
    setDescription("");
    setFilters([]);
    setLocationMode("city");
  };

  const handleSubmit = () => {
    // placeholder: aquí luego llamas tu backend / firestore
    console.log("SUBMIT", { locationMode, name, description, filters });
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

        <LocationToggle value={locationMode} onChange={setLocationMode} />

        <PlaceForm
          name={name}
          description={description}
          onChangeName={setName}
          onChangeDescription={setDescription}
          filters={filters}
          availableFilters={availableFilters}
          onToggleFilter={toggleFilter}
        />

        <PhotoPicker />

        <LocationMap />

        <BottomActions onCancel={handleCancel} onSubmit={handleSubmit} />
      </View>
    </LayoutScreen>
  );
}
