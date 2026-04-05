import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import styles from "./styles";

import { getCurrentLocationService } from "../../../../../services/";

export default function LocationMap({
  selectedLocation,
  onChangeLocation,
}) {
  const [initialRegion, setInitialRegion] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUserLocation();
  }, []);

  const loadUserLocation = async () => {
    try {
      setLoading(true);

      const location = await getCurrentLocationService();

      const region = {
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      };

      setInitialRegion(region);

      // si no hay ubicación seleccionada, usa la del usuario
      if (!selectedLocation) {
        onChangeLocation({
          latitude: location.latitude,
          longitude: location.longitude,
        });
      }
    } catch (error) {
      console.log("Error ubicación:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleMapPress = (event) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;

    onChangeLocation({ latitude, longitude });
  };

  return (
    <View style={styles.box}>
      <Text style={styles.title}>Mapa</Text>

      {loading || !initialRegion ? (
        <View style={styles.loading}>
          <ActivityIndicator size="large" />
          <Text>Cargando ubicación...</Text>
        </View>
      ) : (
       <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={initialRegion}
        showsUserLocation
        onPress={handleMapPress}
      >
        {selectedLocation && <Marker coordinate={selectedLocation} />}
      </MapView>
      )}
    </View>
  );
}