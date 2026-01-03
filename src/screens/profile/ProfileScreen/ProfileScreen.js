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
      bg="#fff"
      edges={["top"]}
    >
      <View style={styles.card}>
        <ProfileHeader
          name="Dante Orozco Gomez Serrano"
          description="Descripcion"
          onEditPress={() => navigation.navigate("EditProfileScreen")}
        />

        <ProfileSettings
          onFavorites={() => navigation.navigate("FavoritesScreen")}
          onAddedPlaces={() => navigation.navigate("AddedPlacesScreen")}
          onConfig={() => navigation.navigate("SettingsScreen")}
        />
      </View>
    </LayoutScreen>
  );
}