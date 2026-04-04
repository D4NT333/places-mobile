import React, { useCallback, useEffect, useState } from "react";
import { FlatList, View, Text, Pressable, ActivityIndicator } from "react-native";
import PlaceCard from "../../../components/PlaceCard";
import { useNavigation } from "@react-navigation/native";
import { LayoutScreen } from "../../../layouts";

import FiltersScreen from "../FiltersScreen/FiltersScreen";
import { filtersData } from "../FiltersScreen/data";

import { getCurrentLocationService } from "../../../services/";
import  sendCurrentLocationToBackendService  from "../../../services/api/sendCurrentLocationToBackend.service";

function makeBatch(startIndex, count = 15) {
  return Array.from({ length: count }).map((_, i) => {
    const n = startIndex + i + 1;
    return {
      id: String(n),
      title: `Bosque del centinela ${n}`,
      height: n % 3 === 0 ? 220 : n % 3 === 1 ? 160 : 190,
    };
  });
}

export default function HomeScreen() {
  const navigation = useNavigation();

  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // ✅ NUEVO: estado del panel
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [filters, setFilters] = useState({
    categoryKey: filtersData.categories[0].key,
    subtags: [],
    price: 0,
    rating: 0,
  });

  const applyFilters = (f) => {
    // ✅ aquí luego haces tu fetch real
    console.log("Aplicar filtros:", f);

    // si quieres, al aplicar puedes resetear lista y simular recarga:
    // setData(makeBatch(0, 15));
    // setPage(1);
  };

  useEffect(() => {
    const first = makeBatch(0, 15);
    setData(first);
    setPage(1);
  }, []);

  const loadMore = useCallback(() => {
    if (loadingMore || !hasMore) return;

    setLoadingMore(true);

    setTimeout(() => {
      const nextBatch = makeBatch(page * 15, 15);

      setData((prev) => [...prev, ...nextBatch]);
      setPage((p) => p + 1);

      setLoadingMore(false);
    }, 700);
  }, [loadingMore, hasMore, page]);

  // ✅ Header con botón de filtros a la derecha
  const header = (
    <View style={{ paddingHorizontal: 16, paddingTop: 8, gap: 8 }}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
        {/* Buscador fake (tu cajita) */}
        <View
          style={{
            flex: 1,
            height: 44,
            borderRadius: 14,
            backgroundColor: "rgba(212, 65, 65, 0.15)",
            paddingHorizontal: 12,
            justifyContent: "center",
          }}
        >
          <Text style={{ color: "rgba(233, 75, 75, 0.85)" }}>
            Buscar lugares, tags, zonas...
          </Text>
        </View>

        {/* ✅ Botón filtros */}
        <Pressable
          onPress={() => setFiltersOpen(true)}
          style={{
            height: 44,
            paddingHorizontal: 14,
            borderRadius: 14,
            borderWidth: 1,
            borderColor: "rgba(0,0,0,0.12)",
            backgroundColor: "rgba(255,255,255,0.85)",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ fontWeight: "900" }}>Filtros</Text>
        </Pressable>
      </View>

      <View style={{ flexDirection: "row", gap: 8 }}>
        <Pressable
          style={{
            paddingVertical: 8,
            paddingHorizontal: 12,
            borderRadius: 999,
            backgroundColor: "rgba(33, 207, 56, 0.15)",
          }}
        >
          <Text style={{ color: "#21cf38ff" }}>Cerca</Text>
        </Pressable>

        <Pressable
          style={{
            paddingVertical: 8,
            paddingHorizontal: 12,
            borderRadius: 999,
            backgroundColor: "rgba(33, 248, 105, 0.61)",
          }}
        >
          <Text style={{ color: "#f84121ff" }}>Popular</Text>
        </Pressable>
      </View>
    </View>
  );


  useEffect(() => { //NEW
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

  return (
    <View style={{ flex: 1 }}>
    <LayoutScreen
      header={header}
      padding={{ top: 24, left: 8, right: 8, bottom: 10 }}
      edges={["top"]}
    >
      <View style={{ flex: 1, backgroundColor: "rgb(155, 30, 155)" }}>
        <FlatList
          style={{ flex: 1 }}
          data={data}
          keyExtractor={(item) => item.id}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 3,
            paddingTop: 30,
            paddingBottom: 60,
          }}
          columnWrapperStyle={{ justifyContent: "space-between" }}
          renderItem={({ item, index }) => (
            <Pressable
              onPress={() =>
                navigation.navigate("PlaceDetailScreen", { placeId: item.id })
              }
              style={{ width: "48%" }}
            >
              <PlaceCard item={item} index={index} />
            </Pressable>
          )}
          onEndReached={loadMore}
          onEndReachedThreshold={0.6}
          ListFooterComponent={
            loadingMore ? (
              <View style={{ paddingVertical: 18 }}>
                <ActivityIndicator />
              </View>
            ) : null
          }
        />
      </View>
    </LayoutScreen>

     {/* ✅ PANEL (va al final para que quede encima) */}
      <FiltersScreen
        open={filtersOpen}
        onClose={() => setFiltersOpen(false)}
        onApply={applyFilters}
        value={filters}
        onChange={setFilters}
        data={filtersData}
      />
    </View>
  );
}
