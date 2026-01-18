import React from "react";
import { View } from "react-native";
import ProfileOption from "../ProfileOption"; 
import styles from "./styles";
import { icons } from "../../../../../../assets/icons"

export default function ProfileSettings({ onFavorites, onAddedPlaces, onConfig }) {
  return (

    <View style={styles.container}>
      <View style={styles.divider}/>
    <View style={styles.options}>
      <ProfileOption label="Favoritos" icon={icons.corazon} onPress={onFavorites} />
      <ProfileOption label="Lugares añadidos" icon={icons.add} onPress={onAddedPlaces} />
      <ProfileOption label="Configuracion" icon={icons.configurar} onPress={onConfig} />
    </View>
    </View>
  );
}
