import React from "react";
import { ScrollView, Text, View, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { LayoutScreen } from "../../../layouts";
import AddedDescriptionCard from "./Components/AddedDescriptionCard";

import styles from "./styles";

const MOCK_DESCRIPTIONS = [
  {
    id: "1",
    name: "Nombre",
    description: "Descripcion",
    submittedAtLabel: "Enviado el 14 de junio",
    status: "approved",
  },
  {
    id: "2",
    name: "Nombre",
    description: "Descripcion",
    submittedAtLabel: "Enviado el 14 de junio",
    status: "in_review",
  },
  {
    id: "4",
    name: "Nombre",
    description: "Descripcion",
    submittedAtLabel: "Enviado el 14 de junio",
    status: "rejected",
  },
];

export default function AddedDescriptionsScreen() {
  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handlePressCard = (item) => {
    navigation.navigate("VisualizedAddedDescriptionScreen", {
      descriptionData: {
        id: item.id,
        placeName: item.name,
        status: item.status,
        submittedAtLabel: item.submittedAtLabel,
        currentDescription:
          "Aquí irá la descripción actual del lugar para visualizar el comparativo.",
        proposedDescription: item.description,
      },
    });
  };

  const handleDelete = (descriptionId) => {
    console.log("Eliminar descripcion:", descriptionId);
  };

  const handleEdit = (descriptionId) => {
    console.log("Editar descripcion:", descriptionId);
  };

  const handleViewReason = (descriptionId) => {
    console.log("Ver motivo:", descriptionId);
  };

  return (
    <LayoutScreen>
      <View style={styles.screen}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Pressable onPress={handleGoBack} style={styles.backButton}>
              <Text style={styles.backIcon}>←</Text>
            </Pressable>

            <Text style={styles.headerTitle}>Descripciones añadidas</Text>
          </View>

          <ScrollView
            contentContainerStyle={styles.content}
            showsVerticalScrollIndicator={false}
          >
            {MOCK_DESCRIPTIONS.map((item) => (
              <AddedDescriptionCard
                key={item.id}
                item={item}
                onPressCard={handlePressCard}
                onDelete={handleDelete}
                onEdit={handleEdit}
                onViewReason={handleViewReason}
              />
            ))}
          </ScrollView>
        </View>
      </View>
    </LayoutScreen>
  );
}