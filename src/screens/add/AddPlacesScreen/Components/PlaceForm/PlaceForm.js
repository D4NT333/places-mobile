import React, { useState } from "react";
import { View, Text, TextInput, Pressable } from "react-native";
import styles from "./styles";

import FiltersSummary from "../FiltersSummary";

export default function PlaceForm({
  name,
  description,
  filters,
  onChangeName,
  onChangeDescription,
  onPressFilters,
}) {
  const NAME_LIMIT = 60;
  const DESCRIPTION_LIMIT = 200;

  const MIN_NAME_LENGTH = 3;
  const MIN_DESCRIPTION_LENGTH = 80;

  const [showNameMinWarning, setShowNameMinWarning] = useState(false);
  const [showDescriptionMinWarning, setShowDescriptionMinWarning] = useState(false);

  const getCharColor = (length, limit, warningStart) => {
    if (length >= limit) return styles.charCountDanger;
    if (length >= warningStart) return styles.charCountWarning;
    return styles.charCount;
  };

  const handleNameBlur = () => {
    const trimmedName = name.trim();
    setShowNameMinWarning(trimmedName.length < MIN_NAME_LENGTH);
  };

  const handleDescriptionBlur = () => {
    const trimmedDescription = description.trim();
    setShowDescriptionMinWarning(trimmedDescription.length < MIN_DESCRIPTION_LENGTH);
  };

  const handleChangeName = (text) => {
    onChangeName(text);

    if (showNameMinWarning && text.trim().length >= MIN_NAME_LENGTH) {
      setShowNameMinWarning(false);
    }
  };

  const handleChangeDescription = (text) => {
    onChangeDescription(text);

    if (showDescriptionMinWarning && text.trim().length >= MIN_DESCRIPTION_LENGTH) {
      setShowDescriptionMinWarning(false);
    }
  };

  return (
    <View style={styles.card}>
      <View style={styles.field}>
        <Text style={styles.label}>Nombre:</Text>
        <TextInput
          value={name}
          onChangeText={handleChangeName}
          onBlur={handleNameBlur}
          placeholder="Ej. Bosque del Centinela"
          placeholderTextColor="#9CA3AF"
          maxLength={NAME_LIMIT}
          style={[
            styles.input,
            name.length >= 60 && styles.inputDanger,
            name.length >= 40 && name.length < 60 && styles.inputWarning
          ]}
        />

        {showNameMinWarning && (
          <Text style={{ color: "#DC2626", marginTop: 6, fontSize: 12 }}>
            El nombre debe tener al menos 3 caracteres.
          </Text>
        )}

        <Text style={getCharColor(name.length, NAME_LIMIT, 40)}>
          {name.length}/{NAME_LIMIT}
        </Text>
      </View>

      {/* Descripción */}
      <View style={styles.field}>
        <Text style={styles.label}>Descripción:</Text>
        <TextInput
          value={description}
          onChangeText={handleChangeDescription}
          onBlur={handleDescriptionBlur}
          placeholder="Cuéntanos qué tiene de especial..."
          placeholderTextColor="#9CA3AF"
          style={[
            styles.input,
            styles.inputMultiline,
            description.length >= 200 && styles.inputDanger,
            description.length >= 180 && description.length < 200 && styles.inputWarning
          ]}
          multiline
          maxLength={DESCRIPTION_LIMIT}
        />

        {showDescriptionMinWarning && (
          <Text style={{ color: "#DC2626", marginTop: 6, fontSize: 12 }}>
            La descripción debe tener al menos 80 caracteres.
          </Text>
        )}

        <Text style={getCharColor(description.length, DESCRIPTION_LIMIT, 180)}>
          {description.length}/{DESCRIPTION_LIMIT}
        </Text>
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Filtros:</Text>
        {filters ? (
          <FiltersSummary
            filters={filters}
            onPress={onPressFilters}
          />
        ) : (
          <Pressable style={styles.filtersButton} onPress={onPressFilters}>
            <Text style={styles.filtersButtonText}>Elegir filtros</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
}