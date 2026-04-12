import React from "react";
import { Pressable, Text, View } from "react-native";
import styles from "./styles";

export default function PriceSlider({
  ranges = [],
  selectedIndex = 0,
  onChangeIndex,
  hasFreeOption = false,
  isFree = false,
  onToggleFree,
}) {
  const hasRanges = Array.isArray(ranges) && ranges.length > 0;

  if (!hasRanges) {
    return null;
  }

  const safeIndex = Math.min(Math.max(selectedIndex, 0), ranges.length - 1);
  const currentRange = ranges[safeIndex];

  const handlePrev = () => {
    if (isFree || safeIndex <= 0) return;
    onChangeIndex?.(safeIndex - 1);
  };

  const handleNext = () => {
    if (isFree || safeIndex >= ranges.length - 1) return;
    onChangeIndex?.(safeIndex + 1);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        {isFree ? "Gratis" : currentRange.label}
      </Text>

      {hasFreeOption ? (
        <Pressable
          onPress={() => onToggleFree?.(!isFree)}
          style={[styles.freeBtn, isFree && styles.freeBtnActive]}
        >
          <Text style={[styles.freeBtnText, isFree && styles.freeBtnTextActive]}>
            Gratis
          </Text>
        </Pressable>
      ) : null}

      <View style={styles.row}>
        <Pressable
          onPress={handlePrev}
          style={[
            styles.btn,
            (safeIndex === 0 || isFree) && styles.btnDisabled,
          ]}
          disabled={safeIndex === 0 || isFree}
        >
          <Text style={styles.btnTxt}>-</Text>
        </Pressable>

        <View style={styles.track}>
          {ranges.map((_, index) => {
            const isActive = !isFree && index <= safeIndex;

            return (
              <View
                key={index}
                style={[styles.step, isActive && styles.stepActive]}
              />
            );
          })}
        </View>

        <Pressable
          onPress={handleNext}
          style={[
            styles.btn,
            (safeIndex === ranges.length - 1 || isFree) && styles.btnDisabled,
          ]}
          disabled={safeIndex === ranges.length - 1 || isFree}
        >
          <Text style={styles.btnTxt}>+</Text>
        </Pressable>
      </View>
    </View>
  );
}