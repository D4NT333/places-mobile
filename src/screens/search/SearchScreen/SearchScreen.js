import React, { useMemo, useState } from "react";
import { View, Text, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LayoutScreen } from "../../../layouts";

import styles from "./styles";
import { MOCK_PLACES } from "./data";
import useDebouncedValue from "./hooks";

import SearchBar from "./Components/SearchBar";
import PlaceSearchRow from "./Components/PlaceSearchRow";

export default function SearchScreen() {
  const navigation = useNavigation();

  const [query, setQuery] = useState("");
  const debouncedQuery = useDebouncedValue(query, 350);

  const results = useMemo(() => {
    const q = debouncedQuery.trim().toLowerCase();
    if (!q) return MOCK_PLACES;

    return MOCK_PLACES.filter((p) => p.name.toLowerCase().includes(q));
  }, [debouncedQuery]);

  return (
    <LayoutScreen
      edges={["top"]}
      padding={{ top: 18, left: 18, right: 18, bottom: 16 }}
      bg="#F6F7FB"
    >

      <SearchBar value={query} onChangeText={setQuery} />

      <FlatList
        data={results}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        renderItem={({ item }) => (
          <PlaceSearchRow
            name={item.name}
            distanceKm={item.distanceKm}
            rating={item.rating}
            onPress={() => {
              console.log("Pressed:", item.id);
            }}
          />
        )}
        ListEmptyComponent={
          <View style={styles.emptyBox}>
            <Text style={styles.emptyTitle}>No encontré resultados</Text>
            <Text style={styles.emptyText}>
              Prueba con otro nombre o revisa que esté bien escrito.
            </Text>
          </View>
        }
      />
    </LayoutScreen>
  );
}