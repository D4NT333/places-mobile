import React, { useCallback, useEffect, useRef, useState } from "react";
import { View } from "react-native";

import { LayoutScreen } from "../../../layouts";

import FiltersScreen from "../FiltersScreen/FiltersScreen";

import HomeFiltersBar from "./Components/HomeFiltersBar";
import PlacesFeed from "./Components/PlacesFeed";

import { getCurrentLocationService } from "../../../services/";
import sendCurrentLocationToBackendService from "../../../services/api/sendCurrentLocationToBackend.service";
import getPlacesFeedService from "../../../services/api/places/read/getPlacesFeed.service";
import {
  getCachedHomeFeed,
  warmHomeFeedCache,
} from "../../../services/firebase/homeFeedCache.service";

import { auth } from "../../../services/firebase/config";

import { getTagsService } from "../../../services/firebase/firestore/tags/getTags.service";

const PAGE_SIZE = 20;

function toNumber(value) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function getDistanceKm(fromCoords, placeLocation) {
  const userLat = toNumber(fromCoords?.latitude);
  const userLng = toNumber(fromCoords?.longitude);

  const placeLat = toNumber(placeLocation?.lat);
  const placeLng = toNumber(placeLocation?.lng);

  if (
    userLat === null ||
    userLng === null ||
    placeLat === null ||
    placeLng === null
  ) {
    return "x";
  }

  const earthRadiusKm = 6371;

  const dLat = ((placeLat - userLat) * Math.PI) / 180;
  const dLng = ((placeLng - userLng) * Math.PI) / 180;

  const lat1 = (userLat * Math.PI) / 180;
  const lat2 = (placeLat * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1) *
      Math.cos(lat2) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return (earthRadiusKm * c).toFixed(1);
}

function getPhotoUrl(place) {
  return (
    place?.photoUrl ||
    place?.mainPhoto?.photoUrl ||
    place?.mainPhoto?.displayUrl ||
    place?.mainPhoto?.url ||
    place?.mainPhoto?.mediumUrl ||
    place?.mainPhoto?.thumbnailUrl ||
    null
  );
}

function getItemId(item) {
  return item?.id || item?.key || item?.value || item?.name || item?.label;
}

function getItemLabel(item) {
  if (!item) return "";

  if (typeof item === "string") return item;

  return item.label || item.name || item.title || item.id || item.key || "";
}

function findTagById(tags, tagId) {
  if (!tagId || !Array.isArray(tags)) return null;

  return tags.find((tag) => {
    const possibleIds = [
      tag.id,
      tag.key,
      tag.value,
      tag.tagId,
    ].filter(Boolean);

    return possibleIds.includes(tagId);
  });
}

function findSubtagLabel(tags, subtagId) {
  if (!subtagId || !Array.isArray(tags)) return "";

  for (const tag of tags) {
    const subtags = tag.subtags || tag.children || [];

    if (!Array.isArray(subtags)) continue;

    const found = subtags.find((subtag) => {
      const possibleIds = [
        subtag.id,
        subtag.key,
        subtag.value,
        subtag.subtagId,
      ].filter(Boolean);

      return possibleIds.includes(subtagId);
    });

    if (found) {
      return getItemLabel(found);
    }
  }

  return "";
}

function findApproachLabel(tags, approachId) {
  if (!approachId || !Array.isArray(tags)) return "";

  for (const tag of tags) {
    const approaches = tag.approaches || [];

    if (!Array.isArray(approaches)) continue;

    const found = approaches.find((approach) => {
      const possibleIds = [
        approach.id,
        approach.key,
        approach.value,
        approach.approachId,
      ].filter(Boolean);

      return possibleIds.includes(approachId);
    });

    if (found) {
      return getItemLabel(found);
    }
  }

  return "";
}

function normalizeTagChip(value) {
  if (typeof value !== "string") return [];

  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function getTagsForCard(place, tagsCatalog) {
  const labels = [];

  const catalogTag = findTagById(tagsCatalog, place?.tagId);

  const tagLabel =
    place?.tagLabel ||
    getItemLabel(catalogTag);

  if (tagLabel) {
    labels.push(...normalizeTagChip(tagLabel));
  }

  if (Array.isArray(place?.subtags)) {
    place.subtags.forEach((subtag) => {
      if (typeof subtag === "string") {
        const label = findSubtagLabel(tagsCatalog, subtag) || subtag;
        labels.push(...normalizeTagChip(label));
        return;
      }

      const subtagId = getItemId(subtag);

      const label =
        getItemLabel(subtag) ||
        findSubtagLabel(tagsCatalog, subtagId);

      labels.push(...normalizeTagChip(label));
    });
  }

  return labels
    .map((label) => label.trim())
    .filter(Boolean)
    .slice(0, 3);
}

function mapPlaceToCard(place, coords, tagsCatalog) {
  const rating = toNumber(place?.rating);

  return {
    id: place.placeId || place.id,
    placeId: place.placeId || place.id,

    title: place.name || "Lugar sin nombre",

    photoUrl: getPhotoUrl(place),

    rating: rating ?? 0,

    distanceKm: getDistanceKm(coords, place.location),

    tags: getTagsForCard(place, tagsCatalog),

    raw: place,
  };
}

function mapPlacesToCards(places, coords, tagsCatalog) {
  return places.map((place) => mapPlaceToCard(place, coords, tagsCatalog));
}

export default function HomeScreen() {
  const [data, setData] = useState([]);

  const [coords, setCoords] = useState(null);
  const [nextCursor, setNextCursor] = useState(null);

  const [loadingInitial, setLoadingInitial] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const [filtersOpen, setFiltersOpen] = useState(false);

  const [filters, setFilters] = useState({
    categoryKey: null,
    categoryLabel: null,

    subtags: [],
    approaches: [],

    priceIndex: 0,
    priceLabel: null,
    isFree: false,

    openingHours: null,
  });

  const [tags, setTags] = useState([]);
  const [loadingTags, setLoadingTags] = useState(true);

  const loadingFeedRef = useRef(false);

  const loadFeed = useCallback(
    async ({
      reset = false,
      currentCoords = coords,
      currentTags = tags,
    } = {}) => {
      if (loadingFeedRef.current) return;

      try {
        loadingFeedRef.current = true;

        if (reset) {
          setLoadingInitial(true);
        } else {
          setLoadingMore(true);
        }

        const result = await getPlacesFeedService({
          limit: PAGE_SIZE,
          cursor: reset ? null : nextCursor,
        });

        const mappedPlaces = mapPlacesToCards(
          result.places,
          currentCoords,
          currentTags
        );

        setData((prev) => {
          if (reset) return mappedPlaces;

          const existingIds = new Set(prev.map((item) => item.id));

          const newItems = mappedPlaces.filter(
            (item) => !existingIds.has(item.id)
          );

          return [...prev, ...newItems];
        });

        setNextCursor(result.nextCursor);
        setHasMore(result.hasMore);
      } catch (error) {
        console.error("Error al cargar feed de lugares:", error);

        if (reset) {
          setData([]);
          setNextCursor(null);
          setHasMore(false);
        }
      } finally {
        loadingFeedRef.current = false;
        setLoadingInitial(false);
        setLoadingMore(false);
      }
    },
    [coords, nextCursor, tags]
  );

  useEffect(() => {
    let isMounted = true;

    const initializeHome = async () => {
      let currentCoords = null;
      let currentTags = [];

      const cachedFeed = getCachedHomeFeed();

      if (cachedFeed?.places?.length > 0) {
        const mappedCachedPlaces = mapPlacesToCards(
          cachedFeed.places,
          null,
          []
        );

        if (isMounted) {
          setData(mappedCachedPlaces);
          setNextCursor(cachedFeed.nextCursor);
          setHasMore(cachedFeed.hasMore);
          setLoadingInitial(false);
        }
      }

      try {
        const [tagsData, feedResult] = await Promise.all([
          getTagsService(),
          cachedFeed ? Promise.resolve(cachedFeed) : warmHomeFeedCache(),
        ]);

        currentTags = tagsData;

        if (isMounted) {
          setTags(tagsData);
          setLoadingTags(false);
        }

        const mappedPlaces = mapPlacesToCards(
          feedResult.places,
          null,
          tagsData
        );

        if (isMounted) {
          setData(mappedPlaces);
          setNextCursor(feedResult.nextCursor);
          setHasMore(feedResult.hasMore);
          setLoadingInitial(false);
        }
      } catch (error) {
        console.error("Error al cargar cache inicial del Home:", error);

        if (isMounted) {
          setLoadingTags(false);
        }

        await loadFeed({
          reset: true,
          currentCoords: null,
          currentTags: [],
        });
      }

      try {
        currentCoords = await getCurrentLocationService();
        console.log("Coords obtenidas:", currentCoords);

        if (isMounted) {
          setCoords(currentCoords);
        }

        const locationSyncResult =
          await sendCurrentLocationToBackendService(currentCoords);

        if (locationSyncResult.ok) {
          console.log("Ubicación enviada al backend:", locationSyncResult);
        } else {
          console.warn("Ubicación no sincronizada. Home continúa normal.");
        }
        
        if (isMounted) {
          setData((prev) =>
            prev.map((item) => ({
              ...item,
              distanceKm: getDistanceKm(currentCoords, item.raw?.location),
            }))
          );
        }
      } catch (error) {
        console.error("Error al obtener ubicación:", error);
      }
    };

    initializeHome();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    console.log("Usuario actual de auth:", auth.currentUser);
    console.log("UID actual:", auth.currentUser?.uid);
  }, []);

  const applyFilters = async (nextFilters) => {
    console.log("Aplicar filtros:", nextFilters);

    setFilters(nextFilters);
    setNextCursor(null);
    setHasMore(true);

    await loadFeed({
      reset: true,
      currentCoords: coords,
      currentTags: tags,
    });
  };

  const loadMore = useCallback(() => {
    if (loadingInitial || loadingMore || !hasMore || !nextCursor) return;

    loadFeed({
      reset: false,
      currentCoords: coords,
      currentTags: tags,
    });
  }, [
    coords,
    hasMore,
    loadingInitial,
    loadingMore,
    loadFeed,
    nextCursor,
    tags,
  ]);

  return (
    <View style={{ flex: 1 }}>
      <LayoutScreen
        header={
          <HomeFiltersBar
            filters={filters}
            onOpenFilters={() => setFiltersOpen(true)}
            onChangeFilters={setFilters}
          />
        }
        padding={{ top: 20, left: 0, right: 0, bottom: 10 }}
        edges={["top"]}
        bg="#F6F7FB"
      >
        <PlacesFeed
          data={data}
          loadingMore={loadingMore}
          onLoadMore={loadMore}
        />
      </LayoutScreen>

      <FiltersScreen
        open={filtersOpen}
        onClose={() => setFiltersOpen(false)}
        onApply={applyFilters}
        value={filters}
        onChange={setFilters}
      />
    </View>
  );
}