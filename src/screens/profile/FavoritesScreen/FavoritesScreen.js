import React, { useState } from "react";
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
  const [items, setItems] = useState(mockFavorites);

  const isEmpty = items.length === 0;

  const onPressItem = (item) => {
    navigation.navigate("PlaceDetail", { placeId: item.id });
  };

  const onToggleFavorite = (item) => {
    setItems((prev) => prev.filter((x) => x.id !== item.id));
  };

  const renderItem = ({ item }) => (
    <FavoriteCard
      name={item.name}
      rating={item.rating}
      tag={item.tag}
      subtag={item.subtag}
      imageUrl={item.imageUrl}
      onPress={() => onPressItem(item)}
      onPressHeart={() => onToggleFavorite(item)}
    />
  );

  return (
    <LayoutScreen
      edges={["top"]}
      bg="#FFFFFF"
      padding={{ top: 8, left: 18, right: 18, bottom: 16 }}
    >
      <Header
        title="Favoritos"
        subtitle="Tus lugares guardados para visitar después"
        onBack={() => navigation.goBack()}
      />

      {isEmpty ? (
        <EmptyState />
      ) : (
        <FlatList
          data={items}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          ItemSeparatorComponent={() => <View style={{ height: 14 }} />}
        />
      )}
    </LayoutScreen>
  );
}