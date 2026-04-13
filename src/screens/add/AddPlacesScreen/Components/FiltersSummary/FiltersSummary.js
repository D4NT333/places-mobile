import React, { useEffect, useMemo, useState } from "react";
import { Pressable, Text, View } from "react-native";
import styles from "./styles";
import { getTagsService } from "../../../../../services/firebase/firestore/tags/getTags.service";
import { getSubtagsByTagId } from "../../../../../services/firebase/firestore/subtags/getSubtagsByTagId.service";
import { getApproachesByTagId } from "../../../../../services/firebase/firestore/approaches/getApproachesByTagId.service";

export default function FiltersSummary({ filters, onPress }) {
  const [categories, setCategories] = useState([]);
  const [subtags, setSubtags] = useState([]);
  const [focuses, setFocuses] = useState([]);

  useEffect(() => {
    let isMounted = true;

    async function loadSummaryData() {
      if (!filters?.categoryId) return;

      try {
        const [tagsData, subtagsData, approachesData] = await Promise.all([
          getTagsService(),
          getSubtagsByTagId(filters.categoryId),
          getApproachesByTagId(filters.categoryId),
        ]);

        if (isMounted) {
          setCategories(tagsData);
          setSubtags(subtagsData);
          setFocuses(approachesData);
        }
      } catch (error) {
        console.error("Error cargando resumen de filtros:", error);
      }
    }

    loadSummaryData();

    return () => {
      isMounted = false;
    };
  }, [filters?.categoryId]);

  const category = useMemo(() => {
    return categories.find((item) => item.id === filters?.categoryId) ?? null;
  }, [categories, filters?.categoryId]);

  const selectedSubtags = useMemo(() => {
    if (!filters?.subtags?.length) return [];
    return subtags.filter((item) => filters.subtags.includes(item.id));
  }, [subtags, filters?.subtags]);

  const selectedFocuses = useMemo(() => {
    if (!filters?.focuses?.length) return [];
    return focuses.filter((item) => filters.focuses.includes(item.id));
  }, [focuses, filters?.focuses]);

  const selectedPriceLabel = useMemo(() => {
    if (filters?.isFree) {
      return "Gratis";
    }

    const ranges = category?.price?.ranges ?? [];
    const selectedRange = ranges.find(
      (item) => item.id === filters?.priceRangeId
    );

    return selectedRange?.label ?? null;
  }, [category, filters?.isFree, filters?.priceRangeId]);

  if (!filters) return null;

  return (
    <Pressable onPress={onPress} style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>{category?.label || "Filtros"}</Text>
        <Text style={styles.editText}>Editar</Text>
      </View>

      {selectedSubtags.length > 0 ? (
        <View style={styles.chipsRow}>
          {selectedSubtags.map((item) => (
            <View key={item.id} style={styles.chip}>
              <Text style={styles.chipText}>{item.label}</Text>
            </View>
          ))}
        </View>
      ) : null}

      {selectedFocuses.length > 0 ? (
        <View style={styles.chipsRow}>
          {selectedFocuses.map((item) => (
            <View key={item.id} style={styles.chipSecondary}>
              <Text style={styles.chipSecondaryText}>{item.label}</Text>
            </View>
          ))}
        </View>
      ) : null}

      {selectedPriceLabel ? (
        <Text style={styles.priceText}>{selectedPriceLabel}</Text>
      ) : null}
    </Pressable>
  );
}