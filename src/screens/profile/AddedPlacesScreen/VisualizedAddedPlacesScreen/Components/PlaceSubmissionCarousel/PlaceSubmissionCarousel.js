import React, { useMemo, useRef, useState } from "react";
import { View, Image, FlatList, Dimensions } from "react-native";

import styles from "./styles";

function getImageUrl(image) {
  if (!image) return null;

  if (typeof image === "string") {
    return image;
  }

  return (
    image.displayUrl ||
    image.mediumUrl ||
    image.medium?.url ||
    image.originalUrl ||
    image.original?.url ||
    image.thumbnailUrl ||
    image.thumbnail?.url ||
    image.url ||
    image.imageUrl ||
    image.fullUrl ||
    image.downloadURL ||
    image.mediumURL ||
    image.thumbnailURL ||
    image.uri ||
    image.src ||
    null
  );
}

export default function PlaceSubmissionCarousel({ images = [] }) {
  const { width } = Dimensions.get("window");
  const listRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const data = useMemo(() => {
    if (!Array.isArray(images)) return [];

    return images
      .map((image, index) => {
        const url = getImageUrl(image);

        if (!url) return null;

        return {
          id:
            image?.photoId ||
            image?.id ||
            image?.path ||
            image?.storagePath ||
            `image_${index}`,
          url,
        };
      })
      .filter(Boolean);
  }, [images]);

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
        keyExtractor={(item, index) => `${item.id}-${index}`}
        horizontal
        pagingEnabled
        decelerationRate="fast"
        snapToAlignment="start"
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={onScrollEnd}
        renderItem={({ item }) => (
          <Image
            source={{ uri: item.url }}
            style={[styles.image, { width: imageWidth }]}
            resizeMode="cover"
            onError={(error) => {
              console.log("Error cargando imagen del carrusel:", {
                url: item.url,
                error: error?.nativeEvent,
              });
            }}
          />
        )}
      />

      {data.length > 1 ? (
        <View style={styles.dots}>
          {data.map((item, index) => (
            <View
              key={`${item.id}-dot-${index}`}
              style={[styles.dot, index === activeIndex && styles.dotActive]}
            />
          ))}
        </View>
      ) : null}
    </View>
  );
}