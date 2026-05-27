import React, { useMemo, useState } from "react";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { LayoutScreen } from "../../../layouts";
import styles from "./styles";

import PlaceHeader from "./Components/PlaceHeader";
import PlaceImageCarousel from "./Components/ImageCarousel";
import PlaceInfo from "./Components/PlaceInfo";
import ReviewsSection from "./Components/ReviewsSection";
import LocationSection from "./Components/LocationSection";

import { mockPlace, mockLsearchReviews, mockGoogleReviews } from "./mock";

const MOCK_MODE = true;

export default function PlaceDetailScreen({ route }) {
  const navigation = useNavigation();

  const placeId = route?.params?.placeId ?? "place_1";
  const [isFavorite, setIsFavorite] = useState(false);

  const place = useMemo(() => {
    if (MOCK_MODE) return mockPlace;
    return mockPlace;
  }, [placeId]);

  const lsearchReviews = useMemo(() => {
    if (MOCK_MODE) return mockLsearchReviews;
    return mockLsearchReviews;
  }, [placeId]);

  const googleReviews = useMemo(() => {
    if (MOCK_MODE) return mockGoogleReviews;
    return mockGoogleReviews;
  }, [placeId]);

  const handleImproveDescription = () => {
    navigation.navigate("ChangeDescriptionScreen", {
      placeId,
      currentDescription: place.description,
      placeName: place.name,
    });
  };

  const handleAddReview = () => {
    navigation.navigate("CommentScreen", {
      placeId,
      placeName: place.name,
    });
  };

  const handleViewAllPhotos = () => {
    console.log("Abrir galería");
  };

  const handleAddPhotos = () => {
    console.log("Abrir agregar fotos");
  };

  const handleReportProblem = () => {
    console.log("Abrir reportar problema");
  };

  return (
    <LayoutScreen
      scroll
      edges={["top"]}
      padding={{ top: 0, left: 0, right: 0, bottom: 128 }}
      bg="#F6F7FB"
    >
      <View style={styles.screen}>
          <PlaceHeader
            name={place.name}
            isOpen={place.isOpen}
            distanceKm={place.distanceKm}
            isFavorite={isFavorite}
            onBack={() => navigation.goBack()}
            onToggleFavorite={() => setIsFavorite((value) => !value)}
          />

          <PlaceImageCarousel
            images={place.images}
            onViewAll={handleViewAllPhotos}
            onAddPhotos={handleAddPhotos}
          />

          <PlaceInfo
            description={place.description}
            googleRating={place.googleRating}
            lsearchRating={place.lsearchRating}
            tags={place.tags}
            onImproveDescription={handleImproveDescription}
          />

        <ReviewsSection
          lsearchSummary={place.lsearchSummary}
          googleSummary={place.googleSummary}
          lsearchReviews={lsearchReviews}
          googleReviews={googleReviews}
          onAddReview={handleAddReview}
          onViewMoreLsearch={() => console.log("Ver más Lsearch")}
          onViewMoreGoogle={() => console.log("Ver más Google")}
        />

        <LocationSection
          address={place.address}
          onReportProblem={handleReportProblem}
        />
      </View>
    </LayoutScreen>
  );
}