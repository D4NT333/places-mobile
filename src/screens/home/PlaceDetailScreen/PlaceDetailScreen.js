import React, { useMemo, useState } from "react";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { LayoutScreen } from "../../../layouts";
import styles from "./styles";

import PlaceImageCarousel from "./Components/ImageCarousel";
import PlaceInfo from "./Components/PlaceInfo";
import CommentsSection from "./Components/Comments/CommentSection";
import HowToGetSection from "./Components/Comments/HowToGet";

import { mockPlace, mockComments } from "./mock";

// 🔥 Cambia a false cuando conectes servicios reales
const MOCK_MODE = true;

export default function PlaceDetailScreen({ route }) {
  const navigation = useNavigation();

  // Cuando uses back: route.params?.placeId
  const placeId = route?.params?.placeId ?? "place_1";

  const [isFavorite, setIsFavorite] = useState(false);

  const place = useMemo(() => {
    if (MOCK_MODE) return mockPlace;
    // TODO: aquí irá data real por placeId
    return mockPlace;
  }, [placeId]);

  const comments = useMemo(() => {
    if (MOCK_MODE) return mockComments;
    // TODO: aquí irá data real
    return mockComments;
  }, [placeId]);

  const handleAddComment = () => {
    // Aquí luego puedes abrir modal o navegar a otra screen
    console.log("Add comment");
  };

  const handleLoadMore = () => {
    console.log("Load more comments");
  };

  return (
    <LayoutScreen scroll edges={["top"]} padding={{ top: 0, left: 0, right: 0, bottom: 18 }}>
      <View style={styles.screen}>
        <PlaceImageCarousel
          images={place.images}
          onBack={() => navigation.goBack()}
          isFavorite={isFavorite}
          onToggleFavorite={() => setIsFavorite((v) => !v)}
        />

        <View style={styles.sectionGap} />

        <PlaceInfo
          name={place.name}
          distanceKm={place.distanceKm}
          description={place.description}
          rating={place.rating}
          reviewsCount={place.reviewsCount}
          tags={place.tags}
        />

        <View style={styles.sectionGap} />

        <CommentsSection
          comments={comments}
          onAddComment={handleAddComment}
          onLoadMore={handleLoadMore}
        />

        <View style={styles.sectionGap} />

        <HowToGetSection location={place.location} address={place.address} />
      </View>
    </LayoutScreen>
  );
}
