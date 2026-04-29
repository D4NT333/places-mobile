import { Pressable, ScrollView, Text, View } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";

import { LayoutScreen } from "../../../layouts";
import AddedPlaceCard from "./Components/AddedPlaceCard";
import DeletePlaceModal from "./Components/DeletePlaceModal";

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

  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [selectedPlaceToDelete, setSelectedPlaceToDelete] = useState(null);

  const handleCancelDelete = () => {
    setDeleteModalVisible(false);
    setSelectedPlaceToDelete(null);
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handlePressCard = (place) => {
    navigation.navigate("VisualizedAddedPlacesScreen", {
      placeId: place.id,
    });
  };

  const handleEdit = (place) => {
    navigation.navigate("EditAddedPlacesScreen", {
      placeId: place.id,
    });
  };

  const handleDelete = (place) => {
    setSelectedPlaceToDelete(place);
    setDeleteModalVisible(true);
  };

  const handleConfirmDelete = () => {
    if (!selectedPlaceToDelete) return;

    console.log("Lugar eliminado:", selectedPlaceToDelete.id);

    setDeleteModalVisible(false);
    setSelectedPlaceToDelete(null);
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
          <View style={styles.titleRow}>
            <Pressable onPress={handleGoBack} style={styles.backButton}>
              <Text style={styles.backIcon}>←</Text>
            </Pressable>

            <Text style={styles.title}>Lugares añadidos</Text>
          </View>

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

      <DeletePlaceModal
        visible={deleteModalVisible}
        placeName={selectedPlaceToDelete?.name || "este lugar"}
        onCancel={handleCancelDelete}
        onConfirm={handleConfirmDelete}
      />
    </LayoutScreen>
  );
}