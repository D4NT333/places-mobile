import React, { useEffect, useMemo, useState } from "react";
import {
  Alert,
  ScrollView,
  Text,
  View,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { LayoutScreen } from "../../../layouts";

import { useAddPlaceDraft } from "../../../context/AddPlaceDraftContext";

import {
  CategoryGrid,
  ChipGroup,
  PriceSection,
  SectionTitle,
} from "./Components";

import { getTagsService } from "../../../services/firebase/firestore/tags/getTags.service";
import { getSubtagsByTagId } from "../../../services/firebase/firestore/subtags/getSubtagsByTagId.service";
import { getApproachesByTagId } from "../../../services/firebase/firestore/approaches/getApproachesByTagId.service";
import styles from "./styles";

export default function FilterSectionScreen({ navigation }) {
  const [step, setStep] = useState(1);

  const [categories, setCategories] = useState([]);
  const [subtags, setSubtags] = useState([]);
  const [focuses, setFocuses] = useState([]);

  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const [isLoadingStepData, setIsLoadingStepData] = useState(false);

  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [selectedSubtags, setSelectedSubtags] = useState([]);
  const [selectedFocuses, setSelectedFocuses] = useState([]);
  const [priceValue, setPriceValue] = useState(0);
  const [isFree, setIsFree] = useState(false);

  const { updateDraft } = useAddPlaceDraft();

  useEffect(() => {
    let isMounted = true;

    async function loadTags() {
      try {
        setIsLoadingCategories(true);
        const data = await getTagsService();

        if (isMounted) {
          setCategories(data);
        }
      } catch (error) {
        console.error("Error cargando categorías:", error);
        Alert.alert("Error", "No se pudieron cargar las categorías.");
      } finally {
        if (isMounted) {
          setIsLoadingCategories(false);
        }
      }
    }

    loadTags();

    return () => {
      isMounted = false;
    };
  }, []);

  const categoryConfig = useMemo(() => {
    return categories.find((c) => c.id === selectedCategoryId) ?? null;
  }, [categories, selectedCategoryId]);

  const hasFocuses = focuses.length > 0;

  const handleSelectCategory = async (category) => {
    try {
      setSelectedCategoryId(category.id);
      setSelectedSubtags([]);
      setSelectedFocuses([]);
      setSubtags([]);
      setFocuses([]);
      setIsFree(false);
      setPriceValue(category.price?.defaultValue ?? 0);

      setIsLoadingStepData(true);

      const [subtagsData, approachesData] = await Promise.all([
        getSubtagsByTagId(category.id),
        getApproachesByTagId(category.id),
      ]);

      setSubtags(subtagsData);
      setFocuses(approachesData);
      setStep(2);
    } catch (error) {
      console.error("Error cargando subtags/enfoques:", error);
      Alert.alert("Error", "No se pudieron cargar las opciones de esta categoría.");
    } finally {
      setIsLoadingStepData(false);
    }
  };

  const toggleSubtag = (item) => {
    setSelectedSubtags((prev) => {
      const exists = prev.some((v) => v.id === item.id);

      let next;

      if (exists) {
        next = prev.filter((v) => v.id !== item.id);
      } else {
        if (prev.length >= 2) {
          Alert.alert("Máximo 2 subetiquetas");
          return prev;
        }
        next = [...prev, item];
      }

      if (next.length >= 1) {
        setTimeout(() => {
          setStep(hasFocuses ? 3 : 4);
        }, 200);
      }

      return next;
    });
  };

  const toggleFocus = (item) => {
    setSelectedFocuses((prev) => {
      const exists = prev.some((v) => v.id === item.id);
      const next = exists ? [] : [item];

      if (next.length >= 1) {
        setTimeout(() => setStep(4), 200);
      }

      return next;
    });
  };

  const handleFinish = () => {
    if (!selectedCategoryId) {
      Alert.alert("Selecciona una categoría");
      return;
    }

    if (selectedSubtags.length < 1) {
      Alert.alert("Selecciona al menos 1 subetiqueta");
      return;
    }

    if (hasFocuses && selectedFocuses.length < 1) {
      Alert.alert("Selecciona 1 enfoque");
      return;
    }

    const payload = {
      categoryId: selectedCategoryId,
      subtags: selectedSubtags.map((item) => item.id),
      focuses: selectedFocuses.map((item) => item.id),
      price: isFree ? 0 : priceValue,
      isFree,
    };

    updateDraft({ filters: payload });
    navigation.goBack();
  };

  return (
    <LayoutScreen edges={["top"]}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Pressable onPress={() => navigation.goBack()}>
            <Text style={styles.back}>←</Text>
          </Pressable>

          <Text style={styles.title}>Filtros</Text>
        </View>

        {isLoadingCategories ? (
          <View style={{ paddingVertical: 40, alignItems: "center" }}>
            <ActivityIndicator size="large" />
            <Text style={{ marginTop: 12 }}>Cargando categorías...</Text>
          </View>
        ) : (
          <>
            {selectedCategoryId && (
              <View style={styles.summary}>
                <Text style={styles.summaryText}>{categoryConfig?.label}</Text>

                {selectedSubtags.length > 0 && (
                  <Text style={styles.summarySub}>
                    {selectedSubtags.map((item) => item.label).join(", ")}
                  </Text>
                )}

                {selectedFocuses.length > 0 && (
                  <Text style={styles.summarySub}>
                    {selectedFocuses.map((item) => item.label).join(", ")}
                  </Text>
                )}
              </View>
            )}

            {step === 1 && (
              <>
                <SectionTitle subtitle="Selecciona la categoría que mejor describe el lugar" />

                <CategoryGrid
                  categories={categories}
                  selectedCategoryId={selectedCategoryId}
                  onSelectCategory={handleSelectCategory}
                />
              </>
            )}

            {isLoadingStepData && (
              <View style={{ paddingVertical: 30, alignItems: "center" }}>
                <ActivityIndicator size="large" />
                <Text style={{ marginTop: 12 }}>Cargando opciones...</Text>
              </View>
            )}

            {!isLoadingStepData && step === 2 && (
              <>
                <SectionTitle subtitle="Elige las etiquetas que lo representen" />

                <ChipGroup
                  options={subtags}
                  selectedValues={selectedSubtags}
                  onToggle={toggleSubtag}
                />
              </>
            )}

            {!isLoadingStepData && step === 3 && hasFocuses && (
              <>
                <SectionTitle title="Enfoque" />

                <ChipGroup
                  options={focuses}
                  selectedValues={selectedFocuses}
                  onToggle={toggleFocus}
                />
              </>
            )}

            {!isLoadingStepData && step === 4 && categoryConfig && (
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
          </>
        )}
      </ScrollView>
    </LayoutScreen>
  );
}