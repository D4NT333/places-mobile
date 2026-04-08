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
      {options.map((item) => (
        <SelectableChip
          key={item}
          label={item}
          selected={selectedValues.includes(item)}
          onPress={() => onToggle(item)}
        />
      ))}
    </View>
  );
}