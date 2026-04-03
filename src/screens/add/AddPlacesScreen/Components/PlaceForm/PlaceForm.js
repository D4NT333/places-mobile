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
  return (
    <View style={styles.card}>
      
      <View style={styles.field}>
        <Text style={styles.label}>Nombre:</Text>
        <TextInput
          value={name}
          onChangeText={onChangeName}
          placeholder="Ej. Bosque del Centinela"
          placeholderTextColor="#9CA3AF"
          style={styles.input}
        />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Descripción:</Text>
        <TextInput
          value={description}
          onChangeText={onChangeDescription}
          placeholder="Cuéntanos qué tiene de especial..."
          placeholderTextColor="#9CA3AF"
          style={[styles.input, styles.inputMultiline]}
          multiline
        />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Filtros:</Text>

        <Pressable style={styles.filterButton} onPress={onPressFilters}>
          <Text style={styles.filterButtonText}>
            Elegir filtros
          </Text>
        </Pressable>

      </View>
    </View>
  );
}