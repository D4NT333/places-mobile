import React, { useMemo } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";

import styles from "./styles";

function getOpeningHoursChip(openingHours) {
  if (!openingHours?.type) return null;

  if (openingHours.type === "defined") {
    return "Horario definido";
  }

  if (openingHours.type === "always_open") {
    return "Abierto 24 horas";
  }

  if (openingHours.type === "not_specified") {
    return "Horario no especificado";
  }

  return null;
}

export default function HomeFiltersBar({
  filters,
  onOpenFilters,
  onChangeFilters,
}) {
  const selectedFilters = useMemo(() => {
    const chips = [];

    if (filters.categoryLabel) {
      chips.push({
        id: "category",
        label: filters.categoryLabel,
        type: "category",
      });
    }

    if (Array.isArray(filters.subtags)) {
      filters.subtags.forEach((subtag) => {
        chips.push({
          id: `subtag-${subtag}`,
          label: subtag,
          type: "subtag",
          value: subtag,
        });
      });
    }

    if (Array.isArray(filters.approaches)) {
      filters.approaches.forEach((approach) => {
        chips.push({
          id: `approach-${approach}`,
          label: approach,
          type: "approach",
          value: approach,
        });
      });
    }

    if (filters.isFree) {
      chips.push({
        id: "price-free",
        label: "Gratis",
        type: "price",
      });
    } else if (filters.priceLabel) {
      chips.push({
        id: "price",
        label: filters.priceLabel,
        type: "price",
      });
    }

    const openingHoursLabel = getOpeningHoursChip(filters.openingHours);

    if (openingHoursLabel) {
      chips.push({
        id: "opening-hours",
        label: openingHoursLabel,
        type: "openingHours",
      });
    }

    return chips;
  }, [filters]);

  const removeFilter = (chip) => {
    if (chip.type === "category") {
      onChangeFilters({
        ...filters,
        categoryKey: null,
        categoryLabel: null,
        subtags: [],
        approaches: [],
        priceIndex: 0,
        priceLabel: null,
        isFree: false,
      });

      return;
    }

    if (chip.type === "subtag") {
      onChangeFilters({
        ...filters,
        subtags: filters.subtags.filter((item) => item !== chip.value),
      });

      return;
    }

    if (chip.type === "approach") {
      onChangeFilters({
        ...filters,
        approaches: filters.approaches.filter((item) => item !== chip.value),
      });

      return;
    }

    if (chip.type === "price") {
      onChangeFilters({
        ...filters,
        priceIndex: 0,
        priceLabel: null,
        isFree: false,
      });

      return;
    }

    if (chip.type === "openingHours") {
      onChangeFilters({
        ...filters,
        openingHours: null,
      });
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
      >
        {selectedFilters.length === 0 ? (
          <View style={styles.emptyChip}>
            <Text style={styles.emptyChipText}>Sin filtros seleccionados</Text>
          </View>
        ) : (
          selectedFilters.map((chip) => (
            <Pressable
              key={chip.id}
              style={styles.chip}
              onPress={() => removeFilter(chip)}
            >
              <Text style={styles.chipText}>{chip.label}</Text>
              <Text style={styles.chipClose}>×</Text>
            </Pressable>
          ))
        )}
      </ScrollView>

      <Pressable style={styles.filterButton} onPress={onOpenFilters}>
        <Text style={styles.filterButtonText}>Filtros</Text>
      </Pressable>
    </View>
  );
}