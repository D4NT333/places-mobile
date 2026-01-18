import React from "react";
import { View, Text, Pressable } from "react-native";
import styles from "./styles";

export default function CommentInput({ onPress }) {
  return (
    <View style={styles.inputRow}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>U</Text>
      </View>

      <Pressable onPress={onPress} style={styles.inputBtn}>
        <Text style={styles.inputBtnText}>Comentar...</Text>
      </Pressable>
    </View>
  );
}
