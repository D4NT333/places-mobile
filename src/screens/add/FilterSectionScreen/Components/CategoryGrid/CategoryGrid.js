import React from "react";
import { View } from "react-native";
import CategoryCard from "../CategoryCard";
import styles from "./styles";

export default function CategoryGrid({
  categories,
  selectedCategoryId,
  onSelectCategory,
}) {
  return (
    <View style={styles.grid}>
      {categories.map((c) => (
        <CategoryCard
          key={c.id}
          item={c}
          selected={selectedCategoryId === c.id}
          onPress={() => onSelectCategory(c)}
        />
      ))}
    </View>
  );
}