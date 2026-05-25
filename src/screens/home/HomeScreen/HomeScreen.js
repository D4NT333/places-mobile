import React, { useCallback, useEffect, useState } from "react";
import { View } from "react-native";

import { LayoutScreen } from "../../../layouts";

import FiltersScreen from "../FiltersScreen/FiltersScreen";

import HomeFiltersBar from "./Components/HomeFiltersBar";
import PlacesFeed from "./Components/PlacesFeed";

import { getCurrentLocationService } from "../../../services/";
import sendCurrentLocationToBackendService from "../../../services/api/sendCurrentLocationToBackend.service";

import { auth } from "../../../services/firebase/config";

import { getTagsService } from "../../../services/firebase/firestore/tags/getTags.service";

function makeBatch(startIndex, count = 15) {
  return Array.from({ length: count }).map((_, i) => {
    const n = startIndex + i + 1;

    return {
      id: String(n),
      title: `Bosque del centinela ${n}`,
      distanceKm: (Math.random() * 8 + 1).toFixed(1),
      rating: (Math.random() * 1.2 + 3.8).toFixed(1),
      tags: ["Naturaleza", "Familiar", "Caminata"],
      height: n % 4 === 0 ? 280 : n % 3 === 0 ? 245 : 220,
    };
  });
}

export default function HomeScreen() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore] = useState(true);

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

  useEffect(() => {
    let isMounted = true;

    const loadTags = async () => {
      try {
        const tagsData = await getTagsService();

        if (isMounted) {
          setTags(tagsData);
        }
      } catch (error) {
        console.error("Error al cargar tags:", error);
      } finally {
        if (isMounted) {
          setLoadingTags(false);
        }
      }
    };

    loadTags();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    const first = makeBatch(0, 15);
    setData(first);
    setPage(1);
  }, []);

  useEffect(() => {
    const initializeLocation = async () => {
      try {
        const coords = await getCurrentLocationService();
        console.log("Coords obtenidas:", coords);

        const result = await sendCurrentLocationToBackendService(coords);
        console.log("Respuesta backend:", result);
      } catch (error) {
        console.error("Error al obtener o mandar ubicación:", error);
      }
    };

    initializeLocation();
  }, []);

  useEffect(() => {
    console.log("Usuario actual de auth:", auth.currentUser);
    console.log("UID actual:", auth.currentUser?.uid);
  }, []);

  const applyFilters = (nextFilters) => {
    console.log("Aplicar filtros:", nextFilters);

    setFilters(nextFilters);

    // Luego aquí haces el fetch real.
    // De momento reseteamos la lista fake para probar visualmente.
    setData(makeBatch(0, 15));
    setPage(1);
  };

  const loadMore = useCallback(() => {
    if (loadingMore || !hasMore) return;

    setLoadingMore(true);

    setTimeout(() => {
      const nextBatch = makeBatch(page * 15, 15);

      setData((prev) => [...prev, ...nextBatch]);
      setPage((prev) => prev + 1);

      setLoadingMore(false);
    }, 700);
  }, [loadingMore, hasMore, page]);

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