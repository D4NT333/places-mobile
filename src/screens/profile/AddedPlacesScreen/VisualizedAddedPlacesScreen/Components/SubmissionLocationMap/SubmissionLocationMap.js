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

export default function SubmissionLocationMap({ region = DEFAULT_REGION }) {
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={region}
        scrollEnabled={false}
        zoomEnabled={false}
        rotateEnabled={false}
        pitchEnabled={false}
        toolbarEnabled={false}
      >
        <Marker
          coordinate={{
            latitude: region.latitude,
            longitude: region.longitude,
          }}
        />
      </MapView>
    </View>
  );
}