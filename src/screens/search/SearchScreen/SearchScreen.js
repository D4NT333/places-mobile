import React, {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  ActivityIndicator,
  FlatList,
  Text,
  View,
} from "react-native";

import {
  useNavigation,
} from "@react-navigation/native";

import {
  LayoutScreen,
} from "../../../layouts";

import searchPlacesService from "../../../services/firebase/searchPlaces.service";

import useDebouncedValue from "./hooks";

import SearchBar from "./Components/SearchBar";
import PlaceSearchRow from "./Components/PlaceSearchRow";

import styles from "./styles";

export default function SearchScreen() {
  const navigation = useNavigation();

  const [query, setQuery] =
    useState("");

  const debouncedQuery =
    useDebouncedValue(
      query,
      350
    );

  const [results, setResults] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const requestIdRef =
    useRef(0);

  const normalizedQuery =
    debouncedQuery.trim();

  useEffect(() => {
    if (!normalizedQuery) {
      requestIdRef.current += 1;

      setResults([]);
      setLoading(false);
      setError("");

      return;
    }

    const currentRequestId =
      requestIdRef.current + 1;

    requestIdRef.current =
      currentRequestId;

    let isMounted = true;

    async function loadPlaces() {
      try {
        setLoading(true);
        setError("");

        const places =
          await searchPlacesService(
            normalizedQuery
          );

        const isLatestRequest =
          requestIdRef.current ===
          currentRequestId;

        if (
          !isMounted ||
          !isLatestRequest
        ) {
          return;
        }

        setResults(
          Array.isArray(places)
            ? places
            : []
        );
      } catch (searchError) {
        const isLatestRequest =
          requestIdRef.current ===
          currentRequestId;

        if (
          !isMounted ||
          !isLatestRequest
        ) {
          return;
        }

        console.log(
          "Error al buscar lugares:",
          searchError
        );

        setResults([]);

        setError(
          "No pudimos realizar la búsqueda. Intenta nuevamente."
        );
      } finally {
        const isLatestRequest =
          requestIdRef.current ===
          currentRequestId;

        if (
          isMounted &&
          isLatestRequest
        ) {
          setLoading(false);
        }
      }
    }

    loadPlaces();

    return () => {
      isMounted = false;
    };
  }, [normalizedQuery]);

  function handleOpenPlace(place) {
    const placeId =
      place?.placeId ||
      place?.id ||
      place?.objectID;

    if (!placeId) {
      console.log(
        "El resultado no tiene placeId:",
        place
      );

      return;
    }

    navigation.navigate(
      "PlaceDetailScreen",
      {
        placeId,
      }
    );
  }

  function renderEmptyState() {
    if (loading) {
      return null;
    }

    if (error) {
      return (
        <View style={styles.emptyBox}>
          <Text style={styles.emptyTitle}>
            No pudimos buscar
          </Text>

          <Text style={styles.emptyText}>
            {error}
          </Text>
        </View>
      );
    }

 if (!normalizedQuery) {
  return (
    <View style={styles.initialState}>
      <View style={styles.initialIcon}>
        <Text style={styles.initialIconText}>
          ⌕
        </Text>
      </View>

      <Text style={styles.initialTitle}>
        Busca lugares
      </Text>

      <Text style={styles.initialText}>
        Escribe el nombre del lugar que quieres encontrar.
      </Text>
    </View>
  );
}

    return (
      <View style={styles.emptyBox}>
        <Text style={styles.emptyTitle}>
          No encontré resultados
        </Text>

        <Text style={styles.emptyText}>
          Prueba con otro nombre o revisa que esté bien escrito.
        </Text>
      </View>
    );
  }

  return (
    <LayoutScreen
      edges={["top"]}
      padding={{
        top: 18,
        left: 18,
        right: 18,
        bottom: 16,
      }}
      bg="#F6F7FB"
    >
      <SearchBar
        value={query}
        onChangeText={setQuery}
      />

      {loading ? (
        <View style={styles.loadingBox}>
          <ActivityIndicator
            size="small"
          />

          <Text style={styles.loadingText}>
            Buscando lugares...
          </Text>
        </View>
      ) : null}

      <FlatList
        data={results}
        keyExtractor={(item) =>
          String(
            item.placeId ||
            item.id ||
            item.objectID
          )
        }
        showsVerticalScrollIndicator={
          false
        }
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={[
          styles.listContent,
          results.length === 0 &&
            styles.emptyListContent,
        ]}
        ItemSeparatorComponent={() => (
          <View
            style={styles.separator}
          />
        )}
        renderItem={({ item }) => (
          <PlaceSearchRow
  name={item.name}
  address={item.address}
  distanceKm={item.distanceKm}
  rating={item.averageRating}
  mainPhoto={item.mainPhoto}
  onPress={() => handleOpenPlace(item)}
/>
        )}
        ListEmptyComponent={
          renderEmptyState
        }
      />
    </LayoutScreen>
  );
}