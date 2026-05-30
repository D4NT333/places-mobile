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
      padding={{ top: 16, left: 16, right: 16, bottom: 16 }}
      bg="#538de4ff"
      edges={["top"]}
    >
      <View style={styles.card}>
        <ProfileHeader
          name="Dante Orozco Gomez Serrano"
          description="Descripción"
          onEditPress={() => navigation.navigate("NotificationsScreen")}
        />

        <ProfileSettings
          onFavorites={() => navigation.navigate("FavoritesScreen")}
          onAddedPlaces={() => navigation.navigate("AddedPlacesScreen")}
          onAddedDescriptions={() =>
            navigation.navigate("AddedDescriptionScreen")
          }
          onAddedPhotos={() => navigation.navigate("AddedPhotosScreen")}
          onConfig={() => navigation.navigate("SettingsProfileScreen")}
        />
      </View>
    </LayoutScreen>
  );
}