import React from "react";
import { View } from "react-native";
import SelectableChip from "../SelectableChip";
import styles from "./styles";

export default function ChipGroup({
  options,
  selectedValues,
  onToggle,
}) {
  return (
    <View style={styles.container}>
      {options.map((item) => {
        const isSelected = selectedValues.some((value) => value.id === item.id);

        return (
          <SelectableChip
            key={item.id}
            label={item.label}
            selected={isSelected}
            onPress={() => onToggle(item)}
          />
        );
      })}
    </View>
  );
}