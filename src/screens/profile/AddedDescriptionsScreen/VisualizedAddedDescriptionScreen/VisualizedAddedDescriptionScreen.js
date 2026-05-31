import React from "react";
import { Pressable, Text, View, ScrollView } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

import { LayoutScreen } from "../../../../layouts";
import DescriptionSectionCard from "./Components/DescriptionSectionCard";

import styles from "./styles";

const STATUS_LABELS = {
  approved: "Aprobado",
  in_review: "En revisión",
  rejected: "Rechazado",
};

export default function VisualizedAddedDescriptionScreen() {
  const navigation = useNavigation();
  const route = useRoute();

  const mockData = {
    placeName: "Nombre del lugar",
    status: "in_review",
    submittedAtLabel: "Enviado el 14 de junio",
    currentDescription:
      "Aquí irá la descripción actual del lugar. Puede ser un texto corto o mediano para visualizar cómo se comporta dentro del contenedor.",
    proposedDescription:
      "Aquí irá la descripción propuesta por el usuario. También puede crecer un poco más para probar el tamaño del bloque y ver cómo responde el diseño.",
  };

  const descriptionData = route.params?.descriptionData || mockData;

  const statusLabel =
    STATUS_LABELS[descriptionData.status] || descriptionData.status || "En revisión";

  const handleClose = () => {
    navigation.goBack();
  };

  return (
    <LayoutScreen
      edges={["top"]}
      padding={{ top: 16, left: 16, right: 16, bottom: 24 }}
      bg="#FFFFFF"
    >
      <View style={styles.screen}>
        <View style={styles.headerRow}>
          <Pressable onPress={handleClose} style={styles.closeButton} hitSlop={12}>
            <Text style={styles.closeText}>X</Text>
          </Pressable>

          <Text style={styles.placeName} numberOfLines={1}>
            {descriptionData.placeName}
          </Text>

          <Text style={styles.statusText} numberOfLines={1}>
            {statusLabel}
          </Text>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.content}
        >
          <Text style={styles.submittedAt}>
            {descriptionData.submittedAtLabel}
          </Text>

          <Text style={styles.descriptionIntro}>
            Comparación entre la descripción actual del lugar y la descripción que propusiste.
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

          {descriptionData.status === "rejected" && (
            <View style={styles.rejectedBox}>
              <Text style={styles.rejectedTitle}>Motivo del rechazo</Text>
              <Text style={styles.rejectedText}>
                La descripción propuesta no cuenta con suficiente información para ser publicada.
              </Text>
            </View>
          )}

          <View style={styles.bottomSpace} />
        </ScrollView>
      </View>
    </LayoutScreen>
  );
}