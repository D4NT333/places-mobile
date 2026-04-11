import React from "react";
import { ScrollView, Text, View, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { LayoutScreen } from "../../../layouts";
import  AddedDescriptionCard  from "./Components/AddedDescriptionCard";

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
    id: "3",
    name: "Nombre",
    description: "Descripcion",
    submittedAtLabel: "Enviado el 14 de junio",
    status: "returned",
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