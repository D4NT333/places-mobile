import React, { useMemo } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import PlaceCard from "../../../../../components/PlaceCard";
import styles from "./styles";

export default function PlacesFeed({
  data,
  loadingMore,
  onLoadMore,
}) {
  const navigation = useNavigation();

  const { leftColumn, rightColumn } = useMemo(() => {
    const left = [];
    const right = [];

    data.forEach((item, index) => {
      const patternIndex = index % 4;

      const cardData = {
        ...item,
        originalIndex: index,
        variant:
          patternIndex === 0 || patternIndex === 3
            ? "tall"
            : "short",
      };

      // Patrón:
      // 0 izquierda grande
      // 1 derecha chica
      // 2 izquierda chica
      // 3 derecha grande
      if (patternIndex === 0 || patternIndex === 2) {
        left.push(cardData);
      } else {
        right.push(cardData);
      }
    });

    return {
      leftColumn: left,
      rightColumn: right,
    };
  }, [data]);

  const handleScroll = (event) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;

    const distanceFromBottom =
      contentSize.height - (layoutMeasurement.height + contentOffset.y);

    if (distanceFromBottom < 450 && !loadingMore) {
      onLoadMore?.();
    }
  };

  const renderCard = (item) => (
    <Pressable
      key={item.id}
      onPress={() =>
        navigation.navigate("PlaceDetailScreen", { placeId: item.id })
      }
      style={styles.cardButton}
    >
      <PlaceCard item={item} variant={item.variant} />
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.list}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        <View style={styles.grid}>
          <View style={styles.column}>
            {leftColumn.map(renderCard)}
          </View>

          <View style={styles.column}>
            {rightColumn.map(renderCard)}
          </View>
        </View>

        {loadingMore && (
          <View style={styles.loader}>
            <ActivityIndicator />
          </View>
        )}
      </ScrollView>
    </View>
  );
}