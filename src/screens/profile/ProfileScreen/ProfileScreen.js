import { useEffect } from "react";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { LayoutScreen } from "../../../layouts";
import { ProfileHeader, ProfileSettings } from "./Components";

import styles from "./styles";

import { preloadAddedPlacesSubmissions } from "../../../services/api/addedPlacesSubmissionsCache.service";

export default function ProfileScreen() {
  const navigation = useNavigation();

  useEffect(() => {
    preloadAddedPlacesSubmissions().catch((error) => {
      console.log("Error al precargar lugares añadidos:", error);
    });
  }, []);

  return (
    <LayoutScreen
      padding={{ top: 0, left: 0, right: 0, bottom: 0 }}
      bg="#F6F7FB"
      edges={["top"]}
    >
      <View style={styles.container}>
        <ProfileHeader
          name="Dante Orozco Gomez Serrano"
          onBellPress={() => navigation.navigate("NotificationsScreen")}
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