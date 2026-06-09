import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { LayoutScreen } from "../../../layouts";
import { ProfileHeader, ProfileSettings } from "./Components";

import styles from "./styles";

import { preloadAddedPlacesSubmissions } from "../../../services/api/submissions/places/read/addedPlacesSubmissionsCache.service";
import {
  getCachedCurrentUser,
  preloadCurrentUser,
} from "../../../services/api/currentUserCache.service";

export default function ProfileScreen() {
  const navigation = useNavigation();

  const [currentUser, setCurrentUser] = useState(() => getCachedCurrentUser());
  const [loadingUser, setLoadingUser] = useState(!getCachedCurrentUser());

  useEffect(() => {
    preloadAddedPlacesSubmissions().catch((error) => {
      console.log("Error al precargar lugares añadidos:", error);
    });
  }, []);

  useEffect(() => {
    let isMounted = true;

    async function loadCurrentUser() {
      try {
        setLoadingUser(true);

        const user = await preloadCurrentUser();

        console.log("Usuario actual cargado:", user);

        if (isMounted) {
          setCurrentUser(user);
        }
        
      } catch (error) {
        console.log(
  "Error al cargar usuario actual:",
  error?.response?.data || error?.message || error
);
      } finally {
        if (isMounted) {
          setLoadingUser(false);
        }
      }
    }

    loadCurrentUser();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <LayoutScreen
      padding={{ top: 0, left: 0, right: 0, bottom: 0 }}
      bg="#F6F7FB"
      edges={["top"]}
    >
      <View style={styles.container}>
        {loadingUser && !currentUser ? (
          <ActivityIndicator size="large" color="#111111" />
        ) : (
          <ProfileHeader
            name={currentUser?.name || "Usuario"}
            photoURL={currentUser?.photoURL}
            onBellPress={() => navigation.navigate("NotificationsScreen")}
          />
        )}

        <ProfileSettings
          currentUser={currentUser}
          onFavorites={() => navigation.navigate("FavoritesScreen")}
          onAddedPlaces={() => navigation.navigate("AddedPlacesScreen")}
          onConfig={() => navigation.navigate("SettingsProfileScreen")}
        />
      </View>
    </LayoutScreen>
  );
}