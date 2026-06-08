import React from "react";
import { View, Text, Pressable, Image } from "react-native";

import ProfileAvatar from "../ProfileAvatar";
import styles from "./styles";
import { icons } from "../../../../../../assets/icons";

export default function ProfileHeader({ name, photoURL, onBellPress }) {
  return (
    <View style={styles.container}>
      <ProfileAvatar name={name} photoURL={photoURL} />

      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={2}>
          {name}
        </Text>
      </View>

      <Pressable onPress={onBellPress} hitSlop={12} style={styles.bellButton}>
        <Image source={icons.bell} style={styles.bellIcon} />
      </Pressable>
    </View>
  );
}