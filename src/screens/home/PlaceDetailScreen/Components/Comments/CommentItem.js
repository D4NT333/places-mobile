import React from "react";
import { View, Text } from "react-native";
import styles from "./styles";

export default function CommentItem({ item }) {
  const letter = item?.userName?.[0]?.toUpperCase?.() ?? "U";

  return (
    <View style={styles.commentItem}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{letter}</Text>
      </View>

      <View style={styles.commentBody}>
        <View style={styles.commentTop}>
          <Text style={styles.commentName} numberOfLines={1}>
            {item.userName}
          </Text>
          <Text style={styles.commentDate}>{item.createdAt}</Text>
        </View>

        <Text style={styles.commentText}>{item.text}</Text>
      </View>
    </View>
  );
}
