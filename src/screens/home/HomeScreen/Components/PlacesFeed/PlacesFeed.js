import React from "react";
import { ActivityIndicator, FlatList, Pressable, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import PlaceCard from "../../../../../components/PlaceCard";

import styles from "./styles";

export default function PlacesFeed({
  data,
  loadingMore,
  onLoadMore,
}) {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.list}
        data={data}
        keyExtractor={(item) => item.id}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
        columnWrapperStyle={styles.columnWrapper}
        renderItem={({ item, index }) => (
          <Pressable
            onPress={() =>
              navigation.navigate("PlaceDetailScreen", { placeId: item.id })
            }
            style={styles.cardButton}
          >
            <PlaceCard item={item} index={index} />
          </Pressable>
        )}
        onEndReached={onLoadMore}
        onEndReachedThreshold={0.6}
        ListFooterComponent={
          loadingMore ? (
            <View style={styles.loader}>
              <ActivityIndicator />
            </View>
          ) : null
        }
      />
    </View>
  );
}