import React, { useMemo, useRef, useState } from "react";
import { View, Image, FlatList, Pressable, Text, Dimensions } from "react-native";
import styles from "./styles";

export default function PlaceImageCarousel({
  images = [],
  onBack,
  isFavorite = false,
  onToggleFavorite,
}) {
  const { width } = Dimensions.get("window");
  const listRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const data = useMemo(() => images.filter(Boolean), [images]);

  const onScrollEnd = (e) => {
    const x = e.nativeEvent.contentOffset.x;
    const index = Math.round(x / width);
    setActiveIndex(index);
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={listRef}
        data={data}
        keyExtractor={(item, i) => `${item}-${i}`}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={onScrollEnd}
        renderItem={({ item }) => (
          <Image source={{ uri: item }} style={[styles.image, { width }]} />
        )}
      />

      {/* Top buttons */}
      <View style={styles.topBar}>
        <Pressable onPress={onBack} style={styles.iconBtn}>
          <Text style={styles.iconText}>‹</Text>
        </Pressable>

        <Pressable onPress={onToggleFavorite} style={styles.iconBtn}>
          <Text style={styles.iconText}>{isFavorite ? "♥" : "♡"}</Text>
        </Pressable>
      </View>

      {/* Dots */}
      <View style={styles.dots}>
        {data.map((_, i) => (
          <View key={i} style={[styles.dot, i === activeIndex && styles.dotActive]} />
        ))}
      </View>
    </View>
  );
}
