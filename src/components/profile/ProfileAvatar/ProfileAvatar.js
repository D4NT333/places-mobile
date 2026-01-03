import React from "react";
import { View, Text } from "react-native";
import styles from "./styles";

export default function ProfileAvatar() {
  return (
    <View style={styles.circle}>
      <Text style={styles.text}>Foto{"\n"}de perfil</Text>
    </View>
  );
}