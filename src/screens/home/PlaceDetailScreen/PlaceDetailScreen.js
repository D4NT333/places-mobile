import React, { useCallback, useMemo, useState } from "react";
import { View } from "react-native";
import {
  useFocusEffect,
  useNavigation,
} from "@react-navigation/native";

import { LayoutScreen } from "../../../layouts";
import styles from "./styles";

import PlaceHeader from "./Components/PlaceHeader";
import PlaceImageCarousel from "./Components/ImageCarousel";
import PlaceInfo from "./Components/PlaceInfo";
import ReviewsSection from "./Components/ReviewsSection";
import LocationSection from "./Components/LocationSection";

import getPlaceDetailService from "../../../services/api/getPlaceDetail.service";
import getMyFavoritesService from "../../../services/api/getMyFavorites.service";
import toggleFavoritePlaceService from "../../../services/api/toggleFavoritePlace.service";

import { mockPlace, mockLsearchReviews, mockGoogleReviews } from "./mock";

const MOCK_MODE = false;

function toNumber(value, fallback = 0) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function normalizeImages(images) {
  if (!Array.isArray(images)) return [];

  return images
    .map((image) => {
      if (typeof image === "string") return image;

      return (
        image?.url ||
        image?.photoUrl ||
        image?.displayUrl ||
        image?.uri ||
        null
      );
    })
    .filter(Boolean);
}

function normalizePlaceForScreen(place) {
  if (!place) return null;

  return {
    id: place.id || place.placeId,
    placeId: place.placeId || place.id,

    name: place.name || "Lugar sin nombre",

    description:
      place.description ||
      "Este lugar todavía no cuenta con una descripción disponible.",

    address: place.address || "Dirección no disponible",

    location: place.location || null,

    isOpen: Boolean(place.isOpen),
    distanceKm: place.distanceKm ?? "x",

    images: normalizeImages(place.images),

    googleRating: toNumber(place.googleRating, 0),
    lsearchRating: toNumber(place.lsearchRating, 0),

    tags: Array.isArray(place.tags) ? place.tags : [],

    lsearchSummary: place.lsearchSummary || {
      averageRating: 0,
      ratingsCount: 0,
      commentsCount: 0,
      recommendsPercent: 0,
    },

    canAddReview: place.canAddReview !== false,
    hasCurrentUserReview: Boolean(place.hasCurrentUserReview),
    currentUserReview: place.currentUserReview || null,

    googleSummary: place.googleSummary || {
      averageRating: toNumber(place.googleRating, 0),
      ratingsCount: 0,
    },

    raw: place,
  };
}

function isPlaceInFavorites(favorites, placeId) {
  const cleanPlaceId = String(placeId || "");

  return favorites.some((favorite) => {
    return (
      String(favorite.placeId || "") === cleanPlaceId ||
      String(favorite.id || "") === cleanPlaceId
    );
  });
}

function getOtherReviews(reviews, currentUserReview) {
  if (!Array.isArray(reviews)) return [];

  const currentReviewId = currentUserReview?.id;
  const currentUserId = currentUserReview?.userId;

  return reviews.filter((review) => {
    if (!review) return false;

    if (currentReviewId && review.id === currentReviewId) {
      return false;
    }

    if (currentUserId && review.userId === currentUserId) {
      return false;
    }

    return true;
  });
}

export default function PlaceDetailScreen({ route }) {
  const navigation = useNavigation();

  const placeId = route?.params?.placeId ?? "place_1";

  const [isFavorite, setIsFavorite] = useState(false);
  const [favoriteLoading, setFavoriteLoading] = useState(false);

  const [placeDetail, setPlaceDetail] = useState(null);
  const [lsearchReviewsData, setLsearchReviewsData] = useState([]);
  const [googleReviewsData, setGoogleReviewsData] = useState([]);

  const [loading, setLoading] = useState(true);

  const loadFavoriteState = useCallback(async () => {
    if (MOCK_MODE) return;

    try {
      const favorites = await getMyFavoritesService();
      setIsFavorite(isPlaceInFavorites(favorites, placeId));
    } catch (error) {
      console.error("Error al cargar estado de favorito:", error);
      setIsFavorite(false);
    }
  }, [placeId]);

  const loadPlaceDetail = useCallback(async () => {
    try {
      setLoading(true);

      if (MOCK_MODE) {
        setPlaceDetail(mockPlace);
        setLsearchReviewsData(mockLsearchReviews);
        setGoogleReviewsData(mockGoogleReviews);
        return;
      }

      const detailResult = await getPlaceDetailService(placeId);

      console.log("Detalle review actual:", {
  canAddReview: detailResult.place?.canAddReview,
  hasCurrentUserReview: detailResult.place?.hasCurrentUserReview,
  currentUserReview: detailResult.place?.currentUserReview,
});

      setPlaceDetail(detailResult.place);

      setLsearchReviewsData(
        Array.isArray(detailResult.lsearchReviews)
          ? detailResult.lsearchReviews
          : []
      );

      setGoogleReviewsData(
        Array.isArray(detailResult.googleReviews)
          ? detailResult.googleReviews
          : []
      );

      loadFavoriteState();
    } catch (error) {
      console.error("Error al cargar detalle del lugar:", error);

      setPlaceDetail(mockPlace);
      setLsearchReviewsData(mockLsearchReviews);
      setGoogleReviewsData(mockGoogleReviews);
      setIsFavorite(false);
    } finally {
      setLoading(false);
    }
  }, [placeId, loadFavoriteState]);

  useFocusEffect(
    useCallback(() => {
      loadPlaceDetail();
    }, [loadPlaceDetail])
  );

  const place = useMemo(() => {
    if (MOCK_MODE) return mockPlace;

    return normalizePlaceForScreen(placeDetail) || mockPlace;
  }, [placeDetail]);

  const lsearchReviews = useMemo(() => {
  if (MOCK_MODE) return mockLsearchReviews;

  return getOtherReviews(lsearchReviewsData, place.currentUserReview);
}, [lsearchReviewsData, place.currentUserReview]);

  const googleReviews = useMemo(() => {
    if (MOCK_MODE) return mockGoogleReviews;

    return googleReviewsData;
  }, [googleReviewsData]);

  const handleToggleFavorite = async () => {
    if (favoriteLoading) return;

    const previousValue = isFavorite;

    try {
      setFavoriteLoading(true);

      setIsFavorite((value) => !value);

      const result = await toggleFavoritePlaceService(placeId);

      setIsFavorite(result.isFavorite);

      console.log("Favorito actualizado:", result);
    } catch (error) {
      console.error("Error al actualizar favorito:", error);

      setIsFavorite(previousValue);
    } finally {
      setFavoriteLoading(false);
    }
  };

  const handleImproveDescription = () => {
    navigation.navigate("ChangeDescriptionScreen", {
      placeId,
      currentDescription: place.description,
      placeName: place.name,
    });
  };

 const handleAddReview = () => {
  if (!place.canAddReview) return;

  navigation.navigate("CommentScreen", {
    placeId,
    placeName: place.name,
    tagId: place.raw?.tagId,
    tagLabel: place.raw?.tagLabel,
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

  if (loading && !placeDetail && !MOCK_MODE) {
    return null;
  }

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
          onToggleFavorite={handleToggleFavorite}
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
          currentUserReview={place.currentUserReview}
          lsearchReviews={lsearchReviews}
          googleReviews={googleReviews}
          canAddReview={place.canAddReview}
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