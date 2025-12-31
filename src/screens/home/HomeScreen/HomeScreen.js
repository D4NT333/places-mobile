import React from "react";
import { View, Text, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import {LayoutScreen} from "../../../layouts"

export default function HomeScreen() {
  const navigation = useNavigation();

  return (
    <LayoutScreen>
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Hola desde Home</Text>

      <Pressable
        onPress={() =>
          navigation.navigate("PlaceDetailScreen", { placeId: 42 })
        }
        style={{ marginTop: 20 }}
      >
        <Text style={{ color: "blue" }}>Ir a detalle</Text>
      </Pressable>
    </View>
    </LayoutScreen>
  );
}