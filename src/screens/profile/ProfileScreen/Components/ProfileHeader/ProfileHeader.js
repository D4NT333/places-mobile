import React from "react";
import { View, Text, Pressable, Image } from "react-native";
import ProfileAvatar from "../ProfileAvatar";
import styles from "./styles";
import {icons} from "../../../../../../assets/icons"

export default function ProfileHeader({ name, description, onEditPress }) {
  return (
    <View style={styles.container}>
      <ProfileAvatar />

      <View style={styles.info}>
        <Text style={styles.title}>Mi perfil</Text>
        <Text style={styles.name} numberOfLines={2}>{name}</Text>
        <Text style={styles.desc} numberOfLines={3}>{description}</Text>
      </View>

      <Pressable onPress={onEditPress} hitSlop={10}>
        <Image source={icons.lapiz} style={styles.editBtn} />
      </Pressable>
    </View>
  );
}