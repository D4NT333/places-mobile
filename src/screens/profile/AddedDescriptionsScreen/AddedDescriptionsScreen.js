import React from "react";
import { ScrollView, Text, View, Pressable, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { LayoutScreen } from "../../../layouts";
import { icons } from "../../../../assets/icons";

import AddedDescriptionCard from "./Components/AddedDescriptionCard";

import styles from "./styles";

const MOCK_DESCRIPTIONS = [
  {
    id: "1",
    name: "Bosque del Centinela",
    description: "Un lugar tranquilo rodeado de naturaleza.",
    submittedAtLabel: "Enviado el 14 de junio",
    status: "approved",
    image: null,
  },
  {
    id: "2",
    name: "La Chata de Guadalajara",
    description: "Propuesta de descripción para restaurante tradicional.",
    submittedAtLabel: "Enviado el 14 de junio",
    status: "in_review",
    image: null,
  },
  {
    id: "4",
    name: "Café Chapultepec",
    description: "Café casual con ambiente agradable.",
    submittedAtLabel: "Enviado el 14 de junio",
    status: "rejected",
    image: null,
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
    <LayoutScreen
      scroll={false}
      edges={["top"]}
      padding={{ top: 16, left: 16, right: 16, bottom: 0 }}
      bg="#FFFFFF"
    >
      <View style={styles.screen}>
        <View style={styles.header}>
          <Pressable onPress={handleGoBack} style={styles.backButton} hitSlop={12}>
            <Image source={icons.flecha} style={styles.backIcon} />
          </Pressable>

          <Text style={styles.headerTitle}>Descripciones añadidas</Text>

          <View style={styles.headerSpacer} />
        </View>

        <Text style={styles.subtitle}>
          Revisa el estado de las descripciones que has propuesto para distintos lugares.
        </Text>

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

          <View style={styles.bottomSpace} />
        </ScrollView>
      </View>
    </LayoutScreen>
  );
}