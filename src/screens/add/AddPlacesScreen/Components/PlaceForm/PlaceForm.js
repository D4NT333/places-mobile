import React from "react";
import { View, Text, TextInput, Pressable } from "react-native";
import styles from "./styles";

export default function PlaceForm({
  name,
  description,
  onChangeName,
  onChangeDescription,
  onPressFilters,
}) {
  const NAME_LIMIT = 60;
  const DESCRIPTION_LIMIT = 200;

  const getCharColor = (length, limit, warningStart) => {
  if (length >= limit) return styles.charCountDanger;
  if (length >= warningStart) return styles.charCountWarning;
  return styles.charCount;
  };

  return (
    <View style={styles.card}>
      <View style={styles.field}>
        <Text style={styles.label}>Nombre:</Text>
        <TextInput
          value={name}
          onChangeText={onChangeName}
          placeholder="Ej. Bosque del Centinela"
          placeholderTextColor="#9CA3AF"
          maxLength={NAME_LIMIT}
        style={[
          styles.input,
          name.length >= 60 && styles.inputDanger,
          name.length >= 40 && name.length < 60 && styles.inputWarning
        ]}
        />
      <Text
      style={getCharColor(name.length, NAME_LIMIT, 40)}
      >
        {name.length}/{NAME_LIMIT}
      </Text>
      </View>


      {/* Descripción */}
      <View style={styles.field}>
        <Text style={styles.label}>Descripción:</Text>
        <TextInput
          value={description}
          onChangeText={onChangeDescription}
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
      <Text
        style={getCharColor(description.length, DESCRIPTION_LIMIT, 180)}
      >
        {description.length}/{DESCRIPTION_LIMIT}
      </Text>
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Filtros:</Text>

        <Pressable style={styles.filterButton} onPress={onPressFilters}>
          <Text style={styles.filterButtonText}>Elegir filtros</Text>
        </Pressable>
      </View>
    </View>
  );
}