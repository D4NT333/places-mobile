import React, { useMemo } from "react";
import { View, Text, Pressable } from "react-native";
import styles from "./styles";

export default function PriceSection({
  config,
  selectedRangeId,
  isFree,
  onChangeRangeId,
  onToggleFree,
}) {
  if (!config) return null;

  const ranges = Array.isArray(config.ranges) ? config.ranges : [];
  const hasFreeOption = config.hasFreeOption ?? false;

  if (!ranges.length) {
    return null;
  }

  const selectedIndex = Math.max(
    0,
    ranges.findIndex((item) => item.id === selectedRangeId)
  );

  const safeIndex = selectedIndex === -1 ? 0 : selectedIndex;
  const currentRange = ranges[safeIndex];

  const handlePrev = () => {
    if (isFree || safeIndex <= 0) return;
    onChangeRangeId?.(ranges[safeIndex - 1].id);
  };

  const handleNext = () => {
    if (isFree || safeIndex >= ranges.length - 1) return;
    onChangeRangeId?.(ranges[safeIndex + 1].id);
  };

  const handleToggleFree = () => {
    onToggleFree?.();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Precio</Text>

      <Text style={styles.currentLabel}>
        {isFree ? "Gratis" : currentRange?.label}
      </Text>

      {hasFreeOption ? (
        <Pressable
          onPress={handleToggleFree}
          style={[styles.freeBtn, isFree && styles.freeBtnActive]}
        >
          <Text style={[styles.freeBtnText, isFree && styles.freeBtnTextActive]}>
            Gratis
          </Text>
        </Pressable>
      ) : null}

      <View style={styles.controlsRow}>
        <Pressable
          onPress={handlePrev}
          style={[styles.controlBtn, (safeIndex <= 0 || isFree) && styles.controlBtnDisabled]}
          disabled={safeIndex <= 0 || isFree}
        >
          <Text style={styles.controlBtnText}>-</Text>
        </Pressable>

        <View style={styles.stepsTrack}>
          {ranges.map((item, index) => {
            const isActive = !isFree && index <= safeIndex;

            return (
              <Pressable
                key={item.id}
                onPress={() => onChangeRangeId?.(item.id)}
                style={[styles.step, isActive && styles.stepActive]}
              />
            );
          })}
        </View>

        <Pressable
          onPress={handleNext}
          style={[
            styles.controlBtn,
            (safeIndex >= ranges.length - 1 || isFree) && styles.controlBtnDisabled,
          ]}
          disabled={safeIndex >= ranges.length - 1 || isFree}
        >
          <Text style={styles.controlBtnText}>+</Text>
        </Pressable>
      </View>
    </View>
  );
}