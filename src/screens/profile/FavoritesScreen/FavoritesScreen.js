import React, { useCallback, useState } from "react";
import { FlatList, View } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { LayoutScreen } from "../../../layouts";

import styles from "./styles";
import Header from "./Components/Header";
import FavoriteCard from "./Components/FavoriteCard";
import EmptyState from "./Components/EmptyState";

import getMyFavoritesService from "../../../services/api/getMyFavorites.service";
import toggleFavoritePlaceService from "../../../services/api/toggleFavoritePlace.service";

function getFavoriteName(item) {
  return item.placeName || item.name || "Lugar sin nombre";
}

function getFavoriteTag(item) {
  return item.tagLabel || item.tag || "Lugar";
}

function getFavoriteSubtag(item) {
  if (typeof item.subtag === "string") {
    return item.subtag;
  }

  if (Array.isArray(item.subtags) && item.subtags.length > 0) {
    return item.subtags[0];
  }

  return "";
}

function getFavoriteImageUrl(item) {
  return (
    item.imageUrl ||
    item.photoUrl ||
    item.mainPhoto?.photoUrl ||
    item.mainPhoto?.displayUrl ||
    item.mainPhoto?.url ||
    item.mainPhoto?.thumbnailUrl ||
    null
  );
}

function getFavoriteRating(item) {
  const parsed = Number(item.rating);
  return Number.isFinite(parsed) ? parsed : 0;
}

function mapFavoriteForCard(item) {
  return {
    id: item.placeId || item.id,
    placeId: item.placeId || item.id,

    name: getFavoriteName(item),
    rating: getFavoriteRating(item),
    tag: getFavoriteTag(item),
    subtag: getFavoriteSubtag(item),
    imageUrl: getFavoriteImageUrl(item),

    raw: item,
  };
}

export default function FavoritesScreen() {
  const navigation = useNavigation();

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [removingId, setRemovingId] = useState(null);

  const loadFavorites = useCallback(async () => {
    try {
      setLoading(true);

      const favorites = await getMyFavoritesService();

      setItems(favorites.map(mapFavoriteForCard));
    } catch (error) {
      console.error("Error al cargar favoritos:", error);
      setItems([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadFavorites();
    }, [loadFavorites])
  );

  const isEmpty = items.length === 0;

  const onPressItem = (item) => {
    navigation.navigate("PlaceDetailScreen", {
  placeId: item.placeId || item.id,
    });

  };

  const onToggleFavorite = async (item) => {
    const placeId = item.placeId || item.id;

    if (!placeId || removingId === placeId) return;

    const previousItems = items;

    try {
      setRemovingId(placeId);

      setItems((prev) =>
        prev.filter((favorite) => favorite.placeId !== placeId)
      );

      const result = await toggleFavoritePlaceService(placeId);

      console.log("Favorito quitado desde FavoritesScreen:", result);

      if (result.isFavorite) {
        await loadFavorites();
      }
    } catch (error) {
      console.error("Error al quitar favorito:", error);

      setItems(previousItems);
    } finally {
      setRemovingId(null);
    }
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

      {isEmpty && !loading ? (
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