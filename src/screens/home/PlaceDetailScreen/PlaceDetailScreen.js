import React from "react";
import { View, Text } from "react-native";
import { LayoutScreen } from "../../../layouts";  

export default function PlaceDetailScreen({ route }) {
  const { placeId } = route.params;

  return (
    <LayoutScreen>
    <View>
      <Text>Detalle del lugar {placeId}</Text>
    </View>
    </LayoutScreen>
  );
}
