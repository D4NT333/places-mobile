import React, { useEffect, useMemo, useState } from "react";
import {
  Alert,
  ScrollView,
  Text,
  View,
  Pressable,
  ActivityIndicator,
  Image,
} from "react-native";
import { LayoutScreen } from "../../../layouts";

import { useAddPlaceDraft } from "../../../context/AddPlaceDraftContext";

import {
  CategoryGrid,
  ChipGroup,
  PriceSection,
  SectionTitle,
  ScheduleSection,
} from "./Components";

import { getTagsService } from "../../../services/firebase/firestore/tags/getTags.service";
import { getSubtagsByTagId } from "../../../services/firebase/firestore/subtags/getSubtagsByTagId.service";
import { getApproachesByTagId } from "../../../services/firebase/firestore/approaches/getApproachesByTagId.service";
import styles from "./styles";

import { icons } from "../../../../assets/icons";

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
  const [selectedPriceRangeId, setSelectedPriceRangeId] = useState(null);
  const [isFree, setIsFree] = useState(false);

  const [scheduleType, setScheduleType] = useState("not_specified");
  const [selectedDays, setSelectedDays] = useState([
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
]);
const [openTime, setOpenTime] = useState("09:00");
const [closeTime, setCloseTime] = useState("18:00");

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
  const shouldShowPriceSummary = step >= 4;

  const selectedPriceRange = useMemo(() => {
    const ranges = categoryConfig?.price?.ranges ?? [];
    return ranges.find((item) => item.id === selectedPriceRangeId) ?? null;
  }, [categoryConfig, selectedPriceRangeId]);

  const handleSelectCategory = async (category) => {
    try {
      const defaultRangeId = category.price?.ranges?.[0]?.id ?? null;

      setSelectedCategoryId(category.id);
      setSelectedSubtags([]);
      setSelectedFocuses([]);
      setSubtags([]);
      setFocuses([]);
      setIsFree(false);
      setSelectedPriceRangeId(defaultRangeId);

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

    if (exists) {
      return prev.filter((v) => v.id !== item.id);
    }

    if (prev.length >= 2) {
      Alert.alert("Máximo 2 subetiquetas");
      return prev;
    }

    return [...prev, item];
  });
  };

  const handleContinueFromSubtags = () => {
  if (selectedSubtags.length < 1) {
    Alert.alert("Selecciona al menos 1 subetiqueta");
    return;
  }

  setStep(hasFocuses ? 3 : 4);
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

  const toggleDay = (dayId) => {
  setSelectedDays((prev) => {
    const exists = prev.includes(dayId);

    if (exists) {
      return prev.filter((id) => id !== dayId);
    }

    return [...prev, dayId];
  });
};

const getScheduleLabel = () => {
  if (scheduleType === "not_specified") return "Horario no especificado";
  if (scheduleType === "always_open") return "Abierto 24 horas";

  const dayLabels = {
    monday: "Lun",
    tuesday: "Mar",
    wednesday: "Mié",
    thursday: "Jue",
    friday: "Vie",
    saturday: "Sáb",
    sunday: "Dom",
  };

  const daysText = selectedDays.map((day) => dayLabels[day]).join(", ");

  return `${daysText} · ${openTime} - ${closeTime}`;
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

    if (!isFree && !selectedPriceRangeId) {
      Alert.alert("Selecciona un rango de precio");
      return;
    }

    if (scheduleType === "defined") {
  if (selectedDays.length < 1) {
    Alert.alert("Selecciona al menos 1 día");
    return;
  }

  if (!openTime || !closeTime) {
    Alert.alert("Selecciona hora de apertura y cierre");
    return;
  }

  if (openTime === closeTime) {
    Alert.alert("La hora de apertura y cierre no puede ser igual");
    return;
  }
} 

  const payload = {
  // Nuevo modelo bueno
  tagId: selectedCategoryId,
  tagLabel: categoryConfig?.label ?? "Sin etiqueta",

  // Compatibilidad para que el summary viejo no se rompa
  categoryId: selectedCategoryId,
  categoryLabel: categoryConfig?.label ?? "Sin categoría",

  // IDs para lógica
  subtags: selectedSubtags.map((item) => item.id),
  focuses: selectedFocuses.map((item) => item.id),

  // Labels para summary / UI
  subtagLabels: selectedSubtags.map((item) => item.label),
  focusLabels: selectedFocuses.map((item) => item.label),

  priceRangeId: isFree ? null : selectedPriceRangeId,
  priceLabel: isFree
    ? "Gratis"
    : selectedPriceRange?.label ?? "Sin rango",

  openingHours: {
  type: scheduleType,
  days: scheduleType === "defined" ? selectedDays : [],
  openTime: scheduleType === "defined" ? openTime : null,
  closeTime: scheduleType === "defined" ? closeTime : null,
  label: getScheduleLabel(),
},

  isFree,
  hasFocuses,
};

updateDraft({ filters: payload });
navigation.goBack();
  };

  return (
    <LayoutScreen edges={["top"]}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
         <Pressable
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Image
            source={icons.flecha}
            style={styles.backIcon}
          />
        </Pressable>

          <Text style={styles.title}>Caracteristicas del lugar</Text>
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

                {shouldShowPriceSummary ? (
                  isFree ? (
                    <Text style={styles.summarySub}>Gratis</Text>
                  ) : selectedPriceRange ? (
                    <Text style={styles.summarySub}>{selectedPriceRange.label}</Text>
                  ) : null
                ) : null}

                {shouldShowPriceSummary && (
                  <Text style={styles.summarySub}>{getScheduleLabel()}</Text>
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
                <SectionTitle subtitle="Selecciona 1 o 2 subetiquetas" />

                <ChipGroup
                  options={subtags}
                  selectedValues={selectedSubtags}
                  onToggle={toggleSubtag}
                />

                <Pressable
                  style={[
                    styles.finishBtn,
                    selectedSubtags.length < 1 && styles.disabledBtn
                  ]}
                  onPress={handleContinueFromSubtags}
                  disabled={selectedSubtags.length < 1}
                >
                  <Text style={styles.finishText}>Continuar</Text>
                </Pressable>
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
                  selectedRangeId={selectedPriceRangeId}
                  isFree={isFree}
                  onChangeRangeId={setSelectedPriceRangeId}
                  onToggleFree={() => setIsFree((prev) => !prev)}
                />

                 <ScheduleSection
                  scheduleType={scheduleType}
                  selectedDays={selectedDays}
                  openTime={openTime}   
                  closeTime={closeTime}
                  onChangeScheduleType={setScheduleType}
                  onToggleDay={toggleDay}
                  onChangeOpenTime={setOpenTime}
                  onChangeCloseTime={setCloseTime}
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