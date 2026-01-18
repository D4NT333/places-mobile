import React from "react";
import { View, Text, TextInput, Pressable } from "react-native";
import styles from "./styles";

function FilterChip({ label, active, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.chip, active ? styles.chipActive : styles.chipInactive]}
    >
      <Text style={[styles.chipText, active ? styles.chipTextActive : styles.chipTextInactive]}>
        {label}
      </Text>
    </Pressable>
  );
}

export default function PlaceForm({
  name,
  description,
  onChangeName,
  onChangeDescription,
  filters,
  availableFilters,
  onToggleFilter,
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
        <View style={styles.chipsWrap}>
          {availableFilters.map((f) => (
            <FilterChip
              key={f}
              label={f}
              active={filters.includes(f)}
              onPress={() => onToggleFilter(f)}
            />
          ))}
        </View>
      </View>
    </View>
  );
}
