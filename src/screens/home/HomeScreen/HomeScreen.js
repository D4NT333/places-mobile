import React, { useCallback, useEffect, useState } from "react";
import { FlatList, View, Text, Pressable, ActivityIndicator } from "react-native";
import PlaceCard from "../../../components/PlaceCard";
import { useNavigation } from "@react-navigation/native";
import { LayoutScreen } from "../../../layouts";

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
  const [page, setPage] = useState(0); // solo para simular tandas
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true); // luego esto vendrá del backend

  // Carga inicial
  useEffect(() => {
    const first = makeBatch(0, 15);
    setData(first);
    setPage(1);
  }, []);

  const loadMore = useCallback(() => {
    if (loadingMore || !hasMore) return;

    setLoadingMore(true);

    // Simula “llamada” (cuando tengas backend, aquí haces fetch)
    setTimeout(() => {
      const nextBatch = makeBatch(page * 15, 15);

      setData((prev) => [...prev, ...nextBatch]);
      setPage((p) => p + 1);

      // Si quieres simular que se acaba:
      // if (page >= 5) setHasMore(false);

      setLoadingMore(false);
    }, 700);
  }, [loadingMore, hasMore, page]);

  // Header personalizado (lo dejé tal cual tuyo)
  const header = (
    <View style={{ paddingHorizontal: 16, paddingTop: 8, gap: 8 }}>
      <View
        style={{
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

  return (
    <LayoutScreen header={header} padding={{ top: 24, left: 8, right: 8, bottom: 10 }} edges={["top"]}>
      <View style={{ flex: 1, backgroundColor: "rgb(155, 30, 155)" }}>
        <FlatList
          style={{ flex: 1 }}
          data={data}
          keyExtractor={(item) => item.id}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 3, paddingTop: 30, paddingBottom: 60 }}
          columnWrapperStyle={{ justifyContent: "space-between" }}
          renderItem={({ item, index }) => (
            <Pressable
              onPress={() => navigation.navigate("PlaceDetailScreen", { placeId: item.id })}
              style={{ width: "48%" }} // ✅ evita que la última se estire
            >
              <PlaceCard item={item} index={index} />
            </Pressable>
          )}
          onEndReached={loadMore}                 // ✅ aquí va
          onEndReachedThreshold={0.6}             // ✅ dispara antes de llegar al final
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
  );
}
