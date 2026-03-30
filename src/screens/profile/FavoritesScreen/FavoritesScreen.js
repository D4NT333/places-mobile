import React, { useMemo, useState } from "react";
import { FlatList, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LayoutScreen } from "../../../layouts";

import styles from "./styles";
import Header from "./Components/Header";
import FavoriteCard from "./Components/FavoriteCard";
import EmptyState from "./Components/EmptyState";

import { mockFavorites } from "./data";

export default function FavoritesScreen() {
  const navigation = useNavigation();

  // mock state (luego lo conectas a Firestore)
  const [items, setItems] = useState(mockFavorites);

  const isEmpty = items.length === 0;

  const onPressItem = (item) => {
    // cámbialo por tu ruta real
    navigation.navigate("PlaceDetail", { placeId: item.id });
  };

  const onToggleFavorite = (item) => {
    // mock: lo quitamos
    setItems((prev) => prev.filter((x) => x.id !== item.id));
  };

  const renderItem = ({ item }) => (
    <FavoriteCard
      name={item.name}
      rating={item.rating}
      distanceKm={item.distanceKm}
      onPress={() => onPressItem(item)}
      onPressHeart={() => onToggleFavorite(item)}
    />
  );

  const keyExtractor = (it) => it.id;

  return (
    <LayoutScreen
      edges={["top"]}
      bg="#FFFFFF"
      padding={{ top: 8, left: 16, right: 16, bottom: 16 }}
    >
      <Header title="Favoritos" onBack={() => navigation.goBack()} />

      {isEmpty ? (
        <EmptyState />
      ) : (
        <FlatList
          data={items}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        />
      )}
    </LayoutScreen>
  );
}
