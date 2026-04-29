import React from "react";
import { View } from "react-native";
import MapView, { Marker } from "react-native-maps";

import styles from "./styles";

const DEFAULT_REGION = {
  latitude: 20.6736,
  longitude: -103.344,
  latitudeDelta: 0.01,
  longitudeDelta: 0.01,
};

function getSafeRegion(region) {
  if (!region) return DEFAULT_REGION;

  const latitude = region.latitude || region.lat;
  const longitude = region.longitude || region.lng;

  if (!latitude || !longitude) return DEFAULT_REGION;

  return {
    latitude,
    longitude,
    latitudeDelta: region.latitudeDelta || 0.01,
    longitudeDelta: region.longitudeDelta || 0.01,
  };
}

export default function SubmissionLocationMap({ region }) {
  const safeRegion = getSafeRegion(region);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={safeRegion}
        scrollEnabled={false}
        zoomEnabled={false}
        rotateEnabled={false}
        pitchEnabled={false}
        toolbarEnabled={false}
      >
        <Marker
          coordinate={{
            latitude: safeRegion.latitude,
            longitude: safeRegion.longitude,
          }}
        />
      </MapView>
    </View>
  );
}