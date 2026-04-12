import React from "react";
import { Pressable, Text, View } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

import { LayoutScreen } from "../../../../layouts";
import DescriptionSectionCard from "./Components";

import styles from "./styles";

export default function VisualizedAddedDescriptionScreen() {
  const navigation = useNavigation();
  const route = useRoute();

  const mockData = {
    placeName: "Nombre del lugar",
    status: "Status",
    submittedAtLabel: "Enviado el 14 de junio",
    currentDescription:
      "Aquí irá la descripción actual del lugar. Puede ser un texto corto o mediano para visualizar cómo se comporta dentro del contenedor.",
    proposedDescription:
      "Aquí irá la descripción propuesta por el usuario. También puede crecer un poco más para probar el tamaño del bloque y ver cómo responde el diseño.",
  };

  const descriptionData = route.params?.descriptionData || mockData;

  const handleClose = () => {
    navigation.goBack();
  };

  return (
    <LayoutScreen
      padding={{ top: 16, left: 16, right: 16, bottom: 16 }}
      bg="#538de4ff"
      edges={["top"]}
    >
      <View style={styles.card}>
        <View style={styles.headerRow}>
          <Pressable onPress={handleClose} style={styles.closeButton}>
            <Text style={styles.closeText}>X</Text>
          </Pressable>

          <Text style={styles.placeName} numberOfLines={1}>
            {descriptionData.placeName}
          </Text>

          <Text style={styles.statusText} numberOfLines={1}>
            {descriptionData.status}
          </Text>
        </View>

        <Text style={styles.submittedAt}>
          {descriptionData.submittedAtLabel}
        </Text>

        <View style={styles.divider} />

        <DescriptionSectionCard
          title="Descripción actual"
          content={descriptionData.currentDescription}
        />

        <DescriptionSectionCard
          title="Descripción propuesta"
          content={descriptionData.proposedDescription}
        />
      </View>
    </LayoutScreen>
  );
}