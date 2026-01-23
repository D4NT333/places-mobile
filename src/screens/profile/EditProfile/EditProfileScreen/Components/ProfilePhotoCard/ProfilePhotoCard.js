import React from "react";
import { View, Text, Pressable, Image } from "react-native";
import styles from "./styles";

export default function ProfilePhotoCard({ uri, onPress }) {
  return (
    <Pressable onPress={onPress} style={styles.wrap}>
      <View style={styles.circle}>
        {uri ? (
          <Image source={{ uri }} style={styles.img} />
        ) : (
          <Text style={styles.placeholder}>Foto de{"\n"}perfil{"\n"}actual</Text>
        )}
      </View>
    </Pressable>
  );
}
