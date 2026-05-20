import React, { useEffect, useMemo, useState } from "react";
import {
  Dimensions,
  Pressable,
  Text,
  View,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import Animated, {
  Easing,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";

import styles from "./styles";
import CategoryChips from "./Components/CategoryChips";
import SubtagList from "./Components/SubtagList";
import PriceSlider from "./Components/PriceSlider";

import { getTagsService } from "../../../services/firebase/firestore/tags/getTags.service";
import { getSubtagsByTagId } from "../../../services/firebase/firestore/subtags/getSubtagsByTagId.service";
import { getApproachesByTagId } from "../../../services/firebase/firestore/approaches/getApproachesByTagId.service";

const { width: SCREEN_W } = Dimensions.get("window");
const PANEL_W = Math.min(Math.round(SCREEN_W * 0.72), 360);

export default function FiltersScreen({
  open,
  onClose,
  onApply,
  value,
  onChange,
}) {
  const progress = useSharedValue(0);
  const insets = useSafeAreaInsets();
  

  const [categories, setCategories] = useState([]);
  const [subtags, setSubtags] = useState([]);
  const [approaches, setApproaches] = useState([]);

  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const [isLoadingOptions, setIsLoadingOptions] = useState(false);

  const hasApproaches = approaches.length > 0;

  useEffect(() => {
    progress.value = withTiming(open ? 1 : 0, {
      duration: open ? 260 : 220,
      easing: Easing.out(Easing.cubic),
    });
  }, [open, progress]);

  useEffect(() => {
    let isMounted = true;

    async function loadCategories() {
      try {
        setIsLoadingCategories(true);

        const tags = await getTagsService();

        if (!isMounted) return;

        const normalizedCategories = tags.map((tag) => ({
          key: tag.id,
          label: tag.label,
          price: tag.price,
        }));

        setCategories(normalizedCategories);

        const firstCategoryKey = normalizedCategories[0]?.key ?? null;

       if (!value.categoryKey && firstCategoryKey) {
  const firstCategory = normalizedCategories[0];

  onChange({
    ...value,
    categoryKey: firstCategoryKey,
    categoryLabel: firstCategory?.label ?? null,

    subtags: [],
    approaches: [],

    priceIndex: 0,
    priceLabel: null,
    isFree: false,

    openingHours: value.openingHours ?? null,
  });
}
      } catch (error) {
        console.error("Error cargando categorías del panel:", error);
      } finally {
        if (isMounted) {
          setIsLoadingCategories(false);
        }
      }
    }

    loadCategories();

    return () => {
      isMounted = false;
    };
  }, []);

  const selectedCategoryKey = value.categoryKey ?? categories[0]?.key ?? null;

  const currentCategory =
    categories.find((item) => item.key === selectedCategoryKey) ?? null;

  useEffect(() => {
    let isMounted = true;

    async function loadCategoryOptions() {
      if (!selectedCategoryKey) {
        setSubtags([]);
        setApproaches([]);
        return;
      }

      try {
        setIsLoadingOptions(true);

        const [subtagsData, approachesData] = await Promise.all([
          getSubtagsByTagId(selectedCategoryKey),
          getApproachesByTagId(selectedCategoryKey),
        ]);

        if (!isMounted) return;

        setSubtags(subtagsData.map((item) => item.label));
        setApproaches(approachesData.map((item) => item.label));
      } catch (error) {
        console.error("Error cargando subtags/enfoques del panel:", error);

        if (isMounted) {
          setSubtags([]);
          setApproaches([]);
        }
      } finally {
        if (isMounted) {
          setIsLoadingOptions(false);
        }
      }
    }

    loadCategoryOptions();

    return () => {
      isMounted = false;
    };
  }, [selectedCategoryKey]);

  const overlayStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(progress.value, [0, 1], [0, 0.35]),
    };
  });

  const panelStyle = useAnimatedStyle(() => {
    const tx = interpolate(progress.value, [0, 1], [PANEL_W, 0]);
    return { transform: [{ translateX: tx }] };
  });

  const pan = useMemo(() => {
    return Gesture.Pan()
      .onUpdate((e) => {
        const drag = Math.max(0, e.translationX);
        const p = 1 - Math.min(drag / PANEL_W, 1);
        progress.value = p;
      })
      .onEnd((e) => {
        const shouldClose = e.translationX > PANEL_W * 0.28 || e.velocityX > 900;

        if (shouldClose) {
          progress.value = withTiming(
            0,
            { duration: 180, easing: Easing.out(Easing.cubic) },
            (finished) => finished && runOnJS(onClose)?.()
          );
        } else {
          progress.value = withTiming(1, {
            duration: 180,
            easing: Easing.out(Easing.cubic),
          });
        }
      });
  }, [onClose, progress]);

  const containerPointer = open ? "auto" : "none";

  const handleSelectCategory = (key) => {
  const selectedCategory = categories.find((item) => item.key === key);

  onChange({
    ...value,
    categoryKey: key,
    categoryLabel: selectedCategory?.label ?? null,

    subtags: [],
    approaches: [],

    priceIndex: 0,
    priceLabel: null,
    isFree: false,
  });
};

  const handleToggleSubtag = (tag) => {
    const prev = value.subtags ?? [];
    const exists = prev.includes(tag);

    const next = exists
      ? prev.filter((item) => item !== tag)
      : [...prev, tag];

    onChange({
      ...value,
      subtags: next,
    });
  };

  const handleToggleApproach = (approach) => {
    const prev = value.approaches ?? [];
    const exists = prev.includes(approach);

    const next = exists
      ? prev.filter((item) => item !== approach)
      : [...prev, approach];

    onChange({
      ...value,
      approaches: next,
    });
  };

  return (
    <View style={styles.root} pointerEvents={containerPointer}>
      <Animated.View style={[styles.overlay, overlayStyle]}>
        <Pressable style={styles.overlayPressable} onPress={onClose} />
      </Animated.View>

      <Animated.View
        style={[
          styles.panel,
          {
            width: PANEL_W,
            top: insets.top,
            bottom: insets.bottom,
            paddingTop: 14,
            paddingBottom: 50,
          },
          panelStyle,
        ]}
      >
        <GestureDetector gesture={pan}>
          <View style={styles.header}>
            <Text style={styles.title}>Filtros</Text>

            <Pressable
              onPress={() => {
                onApply?.(value);
                onClose?.();
              }}
              style={styles.applyBtn}
            >
              <Text style={styles.applyIcon}>✓</Text>
            </Pressable>
          </View>
        </GestureDetector>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
          nestedScrollEnabled
        >
          {isLoadingCategories ? (
            <View style={styles.loadingBox}>
              <ActivityIndicator size="small" />
              <Text style={styles.loadingText}>Cargando categorías...</Text>
            </View>
          ) : (
            <>
              <CategoryChips
                items={categories}
                selectedKey={selectedCategoryKey}
                onSelect={handleSelectCategory}
              />

              <Text style={styles.sectionLabel}>Subetiquetas</Text>

              {isLoadingOptions ? (
                <View style={styles.loadingBox}>
                  <ActivityIndicator size="small" />
                  <Text style={styles.loadingText}>Cargando opciones...</Text>
                </View>
              ) : (
                <SubtagList
                  items={subtags}
                  selected={value.subtags ?? []}
                  onToggle={handleToggleSubtag}
                />
              )}

              {isLoadingOptions ? (
              <View style={styles.loadingBox}>
                <ActivityIndicator size="small" />
                <Text style={styles.loadingText}>Cargando opciones...</Text>
              </View>
            ) : hasApproaches ? (
              <>
                <Text style={styles.sectionLabel}>Enfoques</Text>

                <SubtagList
                  items={approaches}
                  selected={value.approaches ?? []}
                  onToggle={handleToggleApproach}
                />
              </>
            ) : null}

              {!!currentCategory?.price?.ranges?.length && (
                <>
                  <Text style={styles.sectionLabel}>Precio</Text>

                  <PriceSlider
                  ranges={currentCategory.price.ranges}
                  selectedIndex={value.priceIndex ?? 0}
                  onChangeIndex={(index) => {
                    const selectedRange = currentCategory.price.ranges[index];

                    onChange({
                      ...value,
                      priceIndex: index,
                      priceLabel: selectedRange?.label ?? null,
                      isFree: false,
                    });
                  }}
                  hasFreeOption={currentCategory.price.hasFreeOption ?? false}
                  isFree={value.isFree ?? false}
                  onToggleFree={(nextIsFree) =>
                    onChange({
                      ...value,
                      isFree: nextIsFree,
                      priceLabel: nextIsFree ? "Gratis" : value.priceLabel,
                    })
                  }
                />
                </>
              )}
            </>
          )}
        </ScrollView>
      </Animated.View>
    </View>
  );
}