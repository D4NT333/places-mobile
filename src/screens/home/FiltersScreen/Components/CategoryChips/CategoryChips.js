import React, { useState } from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import styles from "./styles";

export default function CategoryChips({ items, selectedKey, onSelect }) {
  const [isSwiping, setIsSwiping] = useState(false);

  return (
    <View
      // Importante para Android cuando hay scrolls anidados
      onTouchStart={() => setIsSwiping(true)}
      onTouchEnd={() => setIsSwiping(false)}
    >
      <FlatList
        horizontal
        data={items}
        keyExtractor={(it) => it.key}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.row}
        nestedScrollEnabled
        renderItem={({ item }) => {
          const active = item.key === selectedKey;
          return (
            <Pressable
              onPress={() => onSelect(item.key)}
              style={[styles.chip, active && styles.chipActive]}
            >
              <Text style={[styles.txt, active && styles.txtActive]}>
                {item.label}
              </Text>
            </Pressable>
          );
        }}
      />
    </View>
  );
}
  