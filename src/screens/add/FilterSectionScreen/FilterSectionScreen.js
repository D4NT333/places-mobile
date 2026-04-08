import React, { useMemo, useState } from "react";
import { Alert, ScrollView, Text, View, Pressable } from "react-native";
import { LayoutScreen } from "../../../layouts";

import { useAddPlaceDraft } from "../../../context/AddPlaceDraftContext";

import {
  CategoryGrid,
  ChipGroup,
  PriceSection,
  SectionTitle,
} from "./Components";

import { CATEGORY_OPTIONS } from "./constants";
import styles from "./styles";

export default function FilterSectionScreen({ navigation }) {
  const [step, setStep] = useState(1);

  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [selectedSubtags, setSelectedSubtags] = useState([]);
  const [selectedFocuses, setSelectedFocuses] = useState([]);
  const [priceValue, setPriceValue] = useState(0);
  const [isFree, setIsFree] = useState(false);

  const { updateDraft } = useAddPlaceDraft();

  const categoryConfig = useMemo(() => {
    return CATEGORY_OPTIONS.find((c) => c.id === selectedCategoryId);
  }, [selectedCategoryId]);

  // 🧠 STEP 1 → categoría
  const handleSelectCategory = (category) => {
    setSelectedCategoryId(category.id);
    setSelectedSubtags([]);
    setSelectedFocuses([]);
    setIsFree(false);
    setPriceValue(category.price.defaultValue);

    setStep(2);
  };

  // 🧠 STEP 2 → subetiquetas
  const toggleSubtag = (value) => {
    setSelectedSubtags((prev) => {
      let next;

      if (prev.includes(value)) {
        next = prev.filter((v) => v !== value);
      } else {
        if (prev.length >= 2) {
          Alert.alert("Máximo 2 subetiquetas");
          return prev;
        }
        next = [...prev, value];
      }

      // avanzar automático
      if (next.length >= 1) {
        setTimeout(() => setStep(3), 200);
      }

      return next;
    });
  };

  // 🧠 STEP 3 → enfoques
  const toggleFocus = (value) => {
    setSelectedFocuses((prev) => {
      let next;

      if (prev.includes(value)) {
        next = prev.filter((v) => v !== value);
      } else {
        if (prev.length >= 4) {
          Alert.alert("Máximo 4 enfoques");
          return prev;
        }
        next = [...prev, value];
      }

      if (next.length >= 2) {
        setTimeout(() => setStep(4), 200);
      }

      return next;
    });
  };

  // 🧠 STEP FINAL → submit automático
 const handleFinish = () => {
    if (!selectedCategoryId) {
      Alert.alert("Selecciona una categoría");
      return;
    }

    if (selectedSubtags.length < 1) {
      Alert.alert("Selecciona al menos 1 subetiqueta");
      return;
    }

    if (selectedFocuses.length < 2) {
      Alert.alert("Selecciona al menos 2 enfoques");
      return;
    }

    const payload = {
      categoryId: selectedCategoryId,
      subtags: selectedSubtags,
      focuses: selectedFocuses,
      price: isFree ? 0 : priceValue,
      isFree,
    };

    updateDraft({ filters: payload });
    navigation.goBack();
  };

  return (
    <LayoutScreen edges={["top"]}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        
        {/* HEADER */}
        <View style={styles.header}>
          <Pressable onPress={() => navigation.goBack()}>
            <Text style={styles.back}>←</Text>
          </Pressable>

          <Text style={styles.title}>Filtros</Text>
        </View>

        {/* RESUMEN (cuando avanzas) */}
        {selectedCategoryId && (
          <View style={styles.summary}>
            <Text style={styles.summaryText}>
              {categoryConfig?.emoji} {categoryConfig?.label}
            </Text>

            {selectedSubtags.length > 0 && (
              <Text style={styles.summarySub}>
                {selectedSubtags.join(", ")}
              </Text>
            )}

            {selectedFocuses.length > 0 && (
              <Text style={styles.summarySub}>
                {selectedFocuses.join(", ")}
              </Text>
            )}
          </View>
        )}

        {/* STEP 1 */}
        {step === 1 && (
          <>
            <SectionTitle subtitle="Selecciona la categoría que mejor describe el lugar" />

            <CategoryGrid
              categories={CATEGORY_OPTIONS}
              selectedCategoryId={selectedCategoryId}
              onSelectCategory={handleSelectCategory}
            />
          </>
        )}

        {/* STEP 2 */}
        {step === 2 && categoryConfig && (
          <>
            <SectionTitle subtitle="Elige las etiquetas que lo representen" />

            <ChipGroup
              options={categoryConfig.subtags}
              selectedValues={selectedSubtags}
              onToggle={toggleSubtag}
            />
          </>
        )}

        {/* STEP 3 */}
        {step === 3 && categoryConfig && (
          <>
            <SectionTitle title="Enfoque" />

            <ChipGroup
              options={categoryConfig.focuses}
              selectedValues={selectedFocuses}
              onToggle={toggleFocus}
            />
          </>
        )}

        {/* STEP 4 */}
        {step === 4 && categoryConfig && (
          <>
            <PriceSection
              config={categoryConfig.price}
              value={priceValue}
              isFree={isFree}
              onChangeValue={setPriceValue}
              onToggleFree={() => setIsFree((prev) => !prev)}
            />

            <Pressable style={styles.finishBtn} onPress={handleFinish}>
              <Text style={styles.finishText}>Listo</Text>
            </Pressable>
          </>
        )}
      </ScrollView>
    </LayoutScreen>
  );
}