import React from "react";
import { View } from "react-native";
import ProfileOption from "../ProfileOption"; // si no existe, te lo dejo abajo
import styles from "./styles";

export default function ProfileSettings({ onFavorites, onAddedPlaces, onConfig }) {
  return (
    <View style={styles.container}>
      <View style={styles.divider} />

      <ProfileOption label="Favoritos" icon="❤️" onPress={onFavorites} />
      <ProfileOption label="Lugares añadidos" icon="＋" onPress={onAddedPlaces} />
      <ProfileOption label="Configuracion" icon="⚙️" onPress={onConfig} />
    </View>
  );
}
