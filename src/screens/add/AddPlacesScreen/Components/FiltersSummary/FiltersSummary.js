import React from "react";
import { Pressable, Text, View } from "react-native";
import styles from "./styles";
import { CATEGORY_OPTIONS } from "../../../FilterSectionScreen/constants";

export default function FiltersSummary({ filters, onPress }) {
  if (!filters) return null;

  const category = CATEGORY_OPTIONS.find(
    (item) => item.id === filters.categoryId
  );

  return (
    <Pressable onPress={onPress} style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>
          {category?.emoji || "🏷️"} {category?.label || "Filtros"}
        </Text>

        <Text style={styles.editText}>Editar</Text>
      </View>

      {filters.subtags?.length > 0 ? (
        <View style={styles.chipsRow}>
          {filters.subtags.map((item) => (
            <View key={item} style={styles.chip}>
              <Text style={styles.chipText}>{item}</Text>
            </View>
          ))}
        </View>
      ) : null}

      {filters.focuses?.length > 0 ? (
        <View style={styles.chipsRow}>
          {filters.focuses.map((item) => (
            <View key={item} style={styles.chipSecondary}>
              <Text style={styles.chipSecondaryText}>{item}</Text>
            </View>
          ))}
        </View>
      ) : null}

      <Text style={styles.priceText}>
        {filters.isFree ? "Gratis" : `Precio aprox. $${filters.price}`}
      </Text>
    </Pressable>
  );
}