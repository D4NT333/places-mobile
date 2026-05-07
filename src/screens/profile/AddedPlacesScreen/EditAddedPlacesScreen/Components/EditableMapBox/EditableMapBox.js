import React, { useEffect, useMemo, useState } from "react";
import { Pressable, Text, View } from "react-native";
import MapView, { Marker } from "react-native-maps";

import styles from "./styles";

function getValidCoordinate(location) {
  if (!location) return null;

  const latitude = Number(location.latitude ?? location.lat);
  const longitude = Number(location.longitude ?? location.lng);

  if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
    return null;
  }

  return {
    latitude,
    longitude,
  };
}

function buildRegion(location) {
  const coordinate = getValidCoordinate(location);

  if (!coordinate) return null;

  return {
    ...coordinate,
    latitudeDelta: 0.005,
    longitudeDelta: 0.005,
  };
}

function formatCoordinate(location) {
  const coordinate = getValidCoordinate(location);

  if (!coordinate) return "ubicación";

  return `${coordinate.latitude.toFixed(5)}, ${coordinate.longitude.toFixed(5)}`;
}

export default function EditableMapBox({
  label,
  newLabel,
  oldLocation,
  newLocation,
  reviewField,
  helperText,
  isEditing = false,
  onPressEdit,
  onChangeLocation,
}) {
  const needsReview = Boolean(reviewField?.selected);

  const initialNewCoordinate = useMemo(
    () => getValidCoordinate(newLocation) || getValidCoordinate(oldLocation),
    [newLocation, oldLocation]
  );

  const [pickedCoordinate, setPickedCoordinate] = useState(initialNewCoordinate);

  useEffect(() => {
    if (!initialNewCoordinate) return;

    setPickedCoordinate((current) => current || initialNewCoordinate);
  }, [initialNewCoordinate]);

  const oldRegion = useMemo(() => buildRegion(oldLocation), [oldLocation]);

  const pickedRegion = useMemo(() => {
    if (!pickedCoordinate) return null;

    return {
      ...pickedCoordinate,
      latitudeDelta: 0.005,
      longitudeDelta: 0.005,
    };
  }, [pickedCoordinate]);

 const handlePickLocation = (event) => {
  const coordinate = event.nativeEvent.coordinate;

  const nextCoordinate = {
    latitude: coordinate.latitude,
    longitude: coordinate.longitude,
  };

  setPickedCoordinate(nextCoordinate);
  onChangeLocation?.(nextCoordinate);
};

  const renderMap = ({ region, coordinate, editable = false }) => {
    if (!region || !coordinate) {
      return (
        <View style={[styles.mapBox, needsReview && styles.mapBoxReview]}>
          <Text style={styles.mapFallbackText}>Sin ubicación</Text>
        </View>
      );
    }

    return (
      <MapView
        style={[styles.mapBox, needsReview && styles.mapBoxReview]}
        initialRegion={region}
        region={editable ? pickedRegion || region : region}
        scrollEnabled={editable}
        zoomEnabled={editable}
        rotateEnabled={false}
        pitchEnabled={false}
        onPress={editable ? handlePickLocation : undefined}
      >
        <Marker
          coordinate={coordinate}
          draggable={editable}
          onDragEnd={editable ? handlePickLocation : undefined}
        />
      </MapView>
    );
  };

  if (isEditing) {
    return (
      <View style={styles.container}>
        <View style={styles.mapCompareBlock}>
          <Text style={styles.compareLabel}>{label}</Text>

          {renderMap({
            region: oldRegion,
            coordinate: getValidCoordinate(oldLocation),
            editable: false,
          })}

          <Text style={[styles.helperText, needsReview && styles.helperReview]}>
            {helperText}
          </Text>

          <Text style={styles.coordinateText}>
            {formatCoordinate(oldLocation)}
          </Text>
        </View>

        <View style={styles.mapCompareBlock}>
          <Text style={styles.compareLabel}>{newLabel || "Mapa nuevo"}</Text>

          {renderMap({
            region: pickedRegion || oldRegion,
            coordinate: pickedCoordinate || getValidCoordinate(oldLocation),
            editable: true,
          })}

          <Text style={[styles.helperText, needsReview && styles.helperReview]}>
            Toca el mapa o arrastra el pin para ajustar la ubicación.
          </Text>

          <Text style={styles.coordinateText}>
            {formatCoordinate(pickedCoordinate)}
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.labelRow}>
        <Text style={styles.label}>{label}</Text>

        {needsReview && (
          <Pressable onPress={onPressEdit} hitSlop={8}>
            <Text style={styles.editText}>Editar</Text>
          </Pressable>
        )}
      </View>

      {renderMap({
        region: oldRegion,
        coordinate: getValidCoordinate(oldLocation),
        editable: false,
      })}

      {!!helperText && (
        <Text style={[styles.helperText, needsReview && styles.helperReview]}>
          {helperText}
        </Text>
      )}
    </View>
  );
}