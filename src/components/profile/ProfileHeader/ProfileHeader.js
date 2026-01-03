import React from "react";
import { View, Text, Pressable } from "react-native";
import ProfileAvatar from "../ProfileAvatar";
import styles from "./styles";

export default function ProfileHeader({ name, description, onEditPress }) {
  return (
    <View style={styles.container}>
      <ProfileAvatar />

      <View style={styles.info}>
        <Text style={styles.title}>Mi perfil</Text>
        <Text style={styles.name} numberOfLines={1}>{name}</Text>
        <Text style={styles.desc} numberOfLines={2}>{description}</Text>
      </View>

      <Pressable onPress={onEditPress} style={styles.editBtn} hitSlop={10}>
        <Text style={styles.editIcon}>✏️</Text>
      </Pressable>
    </View>
  );
}