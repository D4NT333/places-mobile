import React from "react";
import { ScrollView, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { LayoutScreen } from "../../../layouts";

import  AddedPlaceCard  from "./Components";

import styles from "./styles";

const MOCK_PLACES = [
  {
    id: "1",
    name: "Nombre del lugar",
    imageUrl: "https://via.placeholder.com/200x200.png?text=Lugar",
    tag: "Etiqueta",
    subtags: ["Etiqueta", "Etiqueta"],
    submittedAtLabel: "Enviado el 14 de junio",
    status: "approved",
  },
  {
    id: "2",
    name: "Nombre del lugar",
    imageUrl: "https://via.placeholder.com/200x200.png?text=Lugar",
    tag: "Etiqueta",
    subtags: ["Etiqueta", "Etiqueta"],
    submittedAtLabel: "Enviado el 14 de junio",
    status: "in_review",
  },
  {
    id: "3",
    name: "Nombre del lugar",
    imageUrl: "https://via.placeholder.com/200x200.png?text=Lugar",
    tag: "Etiqueta",
    subtags: ["Etiqueta", "Etiqueta"],
    submittedAtLabel: "Enviado el 14 de junio",
    returnedAtLabel: "Devuelto el 18 de junio",
    status: "returned",
  },
  {
    id: "4",
    name: "Nombre del lugar",
    imageUrl: "https://via.placeholder.com/200x200.png?text=Lugar",
    tag: "Etiqueta",
    subtags: ["Etiqueta"],
    submittedAtLabel: "Enviado el 14 de junio",
    status: "rejected",
  },
];

export default function AddedPlacesScreen() {
  const navigation = useNavigation();

  const handlePressCard = (place) => {
    if (place.status === "approved") {
      navigation.navigate("NewPlaceCardScreen", {
        placeId: place.id,
      });
    }
  };

  const handleEdit = (place) => {
    navigation.navigate("EditAddedPlaceScreen", {
      placeId: place.id,
    });
  };

  const handleDelete = (place) => {
    console.log("Eliminar:", place.id);
  };

  const handleViewReason = (place) => {
    navigation.navigate("RejectedPlaceReasonScreen", {
      placeId: place.id,
    });
  };

  return (
    <LayoutScreen
      padding={{ top: 16, left: 16, right: 16, bottom: 16 }}
      bg="#538de4ff"
      edges={["top"]}
    >
      <View style={styles.card}>
        <View style={styles.headerContainer}>
          <Text style={styles.title}>Lugares añadidos</Text>

          <Text style={styles.helperText}>
            Si es aprobado lo toca y lo lleva a la card del lugar nuevo
          </Text>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {MOCK_PLACES.map((place) => (
            <AddedPlaceCard
              key={place.id}
              place={place}
              onPressCard={handlePressCard}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onViewReason={handleViewReason}
            />
          ))}
        </ScrollView>
      </View>
    </LayoutScreen>
  );
}