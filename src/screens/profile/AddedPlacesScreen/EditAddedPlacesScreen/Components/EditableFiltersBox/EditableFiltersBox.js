import React from "react";
import { Pressable, Text, View } from "react-native";

import styles from "./styles";

export default function EditableFiltersBox({
  label,
  filters = [],
  helperText,
  onPress,
}) {
  return (
    <View style={styles.section}>
      <Text style={styles.label}>{label}</Text>

      <Pressable style={styles.filtersBox} onPress={onPress}>
        <View style={styles.chipsContainer}>
          {filters.map((filter) => (
            <View key={filter} style={styles.chip}>
              <Text style={styles.chipText}>{filter}</Text>
            </View>
          ))}
        </View>
      </Pressable>

      {helperText ? <Text style={styles.helperText}>{helperText}</Text> : null}
    </View>
  );
}