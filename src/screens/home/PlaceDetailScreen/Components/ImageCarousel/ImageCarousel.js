import React, { useRef, useState } from "react";
import {
  FlatList,
  Image,
  Pressable,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import styles from "./styles";

export default function PlaceImageCarousel({
  images = [],
  onViewAll,
  onAddPhotos,
}) {
  const { width } = useWindowDimensions();
  const listRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const carouselWidth = width - 40;
  // screen padding horizontal 20 + mainSection padding horizontal 18

  const handleMomentumEnd = (event) => {
    const x = event.nativeEvent.contentOffset.x;
    const index = Math.round(x / carouselWidth);
    setActiveIndex(index);
  };

  const renderItem = ({ item }) => {
    return (
      <View style={[styles.slide, { width: carouselWidth }]}>
        <Image source={{ uri: item }} style={styles.image} />
      </View>
    );
  };

  const total = images.length;

  return (
    <View style={styles.container}>
      <View style={[styles.carouselBox, { width: carouselWidth }]}>
        <FlatList
          ref={listRef}
          data={images}
          keyExtractor={(item, index) => `${item}-${index}`}
          renderItem={renderItem}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          bounces={false}
          onMomentumScrollEnd={handleMomentumEnd}
          decelerationRate="fast"
          snapToInterval={carouselWidth}
          snapToAlignment="start"
        />

        <Pressable onPress={onViewAll} style={styles.viewAllPill}>
          <Text style={styles.viewAllText}>Ver todas</Text>
        </Pressable>

        <View style={styles.counterPill}>
          <Text style={styles.counterText}>
            {activeIndex + 1}/{total}
          </Text>
        </View>

        <View style={styles.dotsContainer}>
          {images.slice(0, 5).map((_, index) => {
            const isActive =
              index === activeIndex || (activeIndex >= 5 && index === 4);

            return (
              <View
                key={index}
                style={[styles.dot, isActive && styles.activeDot]}
              />
            );
          })}
        </View>
      </View>

      <Pressable onPress={onAddPhotos} style={styles.addPhotosButton}>
        <Text style={styles.addPhotosText}>+ Agregar fotos</Text>
      </Pressable>
    </View>
  );
}