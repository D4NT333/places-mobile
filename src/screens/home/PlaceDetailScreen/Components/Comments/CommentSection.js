import React from "react";
import { View, Text, FlatList, Pressable } from "react-native";
import styles from "./styles";

import CommentInput from "./CommentInput";
import CommentItem from "./CommentItem";

export default function CommentsSection({ comments = [], onAddComment, onLoadMore }) {
  return (
    <View style={styles.block}>
      <Text style={styles.title}>Comentarios</Text>

      <CommentInput onPress={onAddComment} />

      <View style={styles.divider} />

      <FlatList
        data={comments}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <CommentItem item={item} />}
        scrollEnabled={false} // importante: la Screen ya es scroll
      />

      <Pressable onPress={onLoadMore} style={styles.seeMore}>
        <Text style={styles.seeMoreText}>Ver más</Text>
      </Pressable>
    </View>
  );
}
