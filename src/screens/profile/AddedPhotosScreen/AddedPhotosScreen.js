import React from "react";
import { ScrollView, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { LayoutScreen } from "../../../layouts";
import  AddedPhotoCard  from "./Components/AddedPhotoCard";

import styles from "./styles";

const MOCK_PHOTOS = [
  {
    id: "1",
    name: "Nombre",
    submittedAtLabel: "Enviado el 14 de junio",
    status: "approved",
  },
  {
    id: "2",
    name: "Nombre",
    submittedAtLabel: "Enviado el 14 de junio",
    status: "rejected",
  },
  {
    id: "3",
    name: "Nombre",
    submittedAtLabel: "Enviado el 14 de junio",
    status: "in_review",
  },
];

export default function AddedPhotosScreen() {
  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleDelete = (photoId) => {
    console.log("Eliminar foto:", photoId);
  };

  const handleViewReason = (photoId) => {
    console.log("Ver motivo de rechazo:", photoId);
  };

  return (
    <LayoutScreen>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.backButton} onPress={handleGoBack}>
            ←
          </Text>

          <Text style={styles.headerTitle}>Fotos añadidas</Text>
        </View>

        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          {MOCK_PHOTOS.map((photo) => (
            <AddedPhotoCard
              key={photo.id}
              photo={photo}
              onDelete={handleDelete}
              onViewReason={handleViewReason}
            />
          ))}
        </ScrollView>
      </View>
    </LayoutScreen>
  );
}