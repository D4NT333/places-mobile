import React, { useMemo } from "react";
import { FlatList } from "react-native";
import  PlaceCard from "../../../components/PlaceCard";

import { View, Text, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import {LayoutScreen} from "../../../layouts"

export default function HomeScreen() {
  const navigation = useNavigation();

    const data = useMemo(
    () =>
      Array.from({ length: 15 }).map((_, i) => ({
        id: String(i + 1),
        title: `Bosque del centinela ${i + 1}`,
        height: i % 3 === 0 ? 220 : i % 3 === 1 ? 160 : 190,
      })),
    []
  );

  //Header personalizado
    const header = (
    <View
      style={{
        paddingHorizontal: 16,
        paddingTop: 8,
        //paddingBottom: 12,
        gap: 8,
      }}
    >
    
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
//Fin header personalizado


  return (
    <LayoutScreen header={header} padding={{ top: 24, left: 8, right: 8, bottom: 10 }} edges={['top']}>
      <View style={{ flex: 1, backgroundColor: "#3f31c0ff"}}>
      <FlatList
      style={{ flex: 1 }}  
      data={data}
      keyExtractor={(item) => item.id}
     renderItem={({ item, index }) => (
      <Pressable
       onPress={() => navigation.navigate("PlaceDetailScreen", { placeId: item.id })}
       style={{ flex: 1 }}
      >
       <PlaceCard item={item} index={index} />
      </Pressable>
     )}

      numColumns={2}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 3, paddingTop: 30, paddingBottom: 60 }} //16,16,16
      columnWrapperStyle={{ justifyContent: "space-between" }}
    />
    </View>
    </LayoutScreen>
  );
}