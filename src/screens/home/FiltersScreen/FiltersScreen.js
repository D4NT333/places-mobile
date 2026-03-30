import React, { useEffect, useMemo } from "react";
import { Dimensions, Pressable, Text, View } from "react-native";
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
import RatingPicker from "./Components/RatingPicker";

const { width: SCREEN_W } = Dimensions.get("window");
const PANEL_W = Math.min(Math.round(SCREEN_W * 0.72), 360);

export default function FiltersScreen({
  open,
  onClose,
  onApply,
  value,
  onChange,
  data,
}) {
  const progress = useSharedValue(0);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    progress.value = withTiming(open ? 1 : 0, {
      duration: open ? 260 : 220,
      easing: Easing.out(Easing.cubic),
    });
  }, [open]);

  const overlayStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(progress.value, [0, 1], [0, 0.35]),
    };
  });

  const panelStyle = useAnimatedStyle(() => {
    const tx = interpolate(progress.value, [0, 1], [PANEL_W, 0]);
    return { transform: [{ translateX: tx }] };
  });

  // Swipe to close (derecha)
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
  }, [onClose]);

  const containerPointer = open ? "auto" : "none";

  const selectedCategory = value.categoryKey ?? data.categories[0].key;
  const currentCategory = data.categories.find((c) => c.key === selectedCategory);

  return (
    <View style={styles.root} pointerEvents={containerPointer}>
      {/* Overlay */}
      <Animated.View style={[styles.overlay, overlayStyle]}>
        <Pressable style={styles.overlayPressable} onPress={onClose} />
      </Animated.View>

      {/* ✅ Panel (YA NO está envuelto por GestureDetector) */}
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
        {/* ✅ SOLO el header es draggable */}
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

        {/* Categorías (ahora sí puede hacer swipe horizontal) */}
        <CategoryChips
          items={data.categories}
          selectedKey={selectedCategory}
          onSelect={(key) => onChange({ ...value, categoryKey: key })}
        />

        {/* Subtags */}
        <Text style={styles.sectionLabel}>Subetiquetas</Text>
        <SubtagList
          items={currentCategory?.subtags ?? []}
          selected={value.subtags ?? []}
          onToggle={(tag) => {
            const prev = value.subtags ?? [];
            const exists = prev.includes(tag);
            const next = exists ? prev.filter((t) => t !== tag) : [...prev, tag];
            onChange({ ...value, subtags: next });
          }}
        />

        {/* Precio */}
        <Text style={styles.sectionLabel}>Precio</Text>
        <PriceSlider
          min={0}
          max={200}
          value={value.price ?? 0}
          onChange={(v) => onChange({ ...value, price: v })}
        />

        {/* Popularidad */}
        <Text style={styles.sectionLabel}>Popularidad</Text>
        <RatingPicker
          value={value.rating ?? 0}
          onChange={(r) => onChange({ ...value, rating: r })}
        />

        {/* Footer */}
        <View style={styles.footer}>
          <Pressable
            onPress={() =>
              onChange({
                categoryKey: data.categories[0].key,
                subtags: [],
                price: 0,
                rating: 0,
              })
            }
            style={styles.clearBtn}
          >
            <Text style={styles.clearText}>Limpiar filtros</Text>
          </Pressable>
        </View>
      </Animated.View>
    </View>
  );
}
