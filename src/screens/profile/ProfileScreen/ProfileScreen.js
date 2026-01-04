import React from "react";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { LayoutScreen } from "../../../layouts";

import ProfileHeader from "../../../components/profile/ProfileHeader";
import ProfileSettings from "../../../components/profile/ProfileSettings";

import styles from "./styles";

export default function ProfileScreen() {
  const navigation = useNavigation();

  return (
    <LayoutScreen
      padding={{ top: 16, left: 16, right: 16, bottom: 16 }}
      bg="#538de4ff"
      edges={["top"]}
    >
      <View style={styles.card}>
        <ProfileHeader
          name="Dante Orozco Gomez Serrano Soy todo un guarrindongo"
          description="Soy un apasionado por descubrir nuevos lugares y compartir mis experiencias con otros viajeros."
          onEditPress={() => navigation.navigate("EditProfileScreen")}
        />

        <ProfileSettings
          onFavorites={() => navigation.navigate("FavoritesScreen")}
          onAddedPlaces={() => navigation.navigate("AddedPlacesScreen")}
          onConfig={() => navigation.navigate("SettingsProfileScreen")}
        />
      </View>
    </LayoutScreen>
  );
}