import React, {
  useState,
} from "react";

import {
  FlatList,
  Image,
  Text,
  View,
} from "react-native";

import styles from "./styles";

export default function PhotoCarousel({
  photos = [],
}) {
  const [
    containerWidth,
    setContainerWidth,
  ] = useState(0);

  const [
    activeIndex,
    setActiveIndex,
  ] = useState(0);

  const handleLayout = (event) => {
    const width =
      event.nativeEvent.layout.width;

    setContainerWidth(width);
  };

  const handleScrollEnd = (
    event
  ) => {
    if (!containerWidth) {
      return;
    }

    const offsetX =
      event.nativeEvent.contentOffset.x;

    const nextIndex = Math.round(
      offsetX / containerWidth
    );

    setActiveIndex(nextIndex);
  };

  if (photos.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyTitle}>
          Sin fotografías
        </Text>

        <Text style={styles.emptyText}>
          No hay imágenes disponibles para
          esta propuesta.
        </Text>
      </View>
    );
  }

  return (
    <View
      style={styles.container}
      onLayout={handleLayout}
    >
      {containerWidth > 0 && (
        <FlatList
          data={photos}
          horizontal
          pagingEnabled
          bounces={false}
          showsHorizontalScrollIndicator={
            false
          }
          keyExtractor={(item) =>
            item.id
          }
          onMomentumScrollEnd={
            handleScrollEnd
          }
          renderItem={({ item }) => (
            <Image
              source={{
                uri: item.uri,
              }}
              resizeMode="cover"
              style={[
                styles.image,
                {
                  width:
                    containerWidth,
                },
              ]}
            />
          )}
        />
      )}

      {photos.length > 1 && (
        <>
          <View style={styles.counter}>
            <Text
              style={
                styles.counterText
              }
            >
              {activeIndex + 1}/
              {photos.length}
            </Text>
          </View>

          <View
            style={
              styles.dotsContainer
            }
          >
            {photos.map(
              (photo, index) => (
                <View
                  key={photo.id}
                  style={[
                    styles.dot,

                    index ===
                      activeIndex &&
                      styles.activeDot,
                  ]}
                />
              )
            )}
          </View>
        </>
      )}
    </View>
  );
}