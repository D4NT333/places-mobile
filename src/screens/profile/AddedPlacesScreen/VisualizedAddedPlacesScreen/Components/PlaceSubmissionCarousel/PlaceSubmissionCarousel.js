import React, { useMemo, useRef, useState } from "react";
import { View, Image, FlatList, Dimensions } from "react-native";

import styles from "./styles";

export default function PlaceSubmissionCarousel({ images = [] }) {
  const { width } = Dimensions.get("window");
  const listRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const data = useMemo(() => images.filter(Boolean), [images]);
  const imageWidth = width - 32;

  const onScrollEnd = (event) => {
    const x = event.nativeEvent.contentOffset.x;
    const index = Math.round(x / imageWidth);
    setActiveIndex(index);
  };

  if (!data.length) {
    return (
      <View style={styles.emptyContainer}>
        <View style={styles.emptyBox} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        ref={listRef}
        data={data}
        keyExtractor={(item, index) => `${item}-${index}`}
        horizontal
        pagingEnabled
        decelerationRate="fast"
        snapToAlignment="start"
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={onScrollEnd}
        renderItem={({ item }) => (
          <Image source={{ uri: item }} style={[styles.image, { width: imageWidth }]} />
        )}
      />

      {data.length > 1 ? (
        <View style={styles.dots}>
          {data.map((_, index) => (
            <View
              key={index}
              style={[styles.dot, index === activeIndex && styles.dotActive]}
            />
          ))}
        </View>
      ) : null}
    </View>
  );
}