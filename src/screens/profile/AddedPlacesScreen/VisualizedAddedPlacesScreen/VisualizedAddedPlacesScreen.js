import React from "react";
import { ScrollView, Text, View, Pressable } from "react-native";

import { LayoutScreen } from "../../../../layouts";
import PlaceSubmissionCarousel from "./Components/PlaceSubmissionCarousel";
import SubmissionLocationMap from "./Components/SubmissionLocationMap";

import styles from "./styles";

const MOCK_PLACE = {
  id: "1",
  name: "Nombre del lugar",
  submittedAtLabel: "Enviado el 14 de junio",
  status: "returned", // approved | in_review | returned
  description:
    "Descripción breve del lugar para que el usuario pueda revisar qué fue lo que propuso.",
  tags: ["Etiqueta", "Etiqueta", "Etiqueta", "Etiqueta"],
  priceLabel: "150 - 299 MXN",
  images: [
    "https://via.placeholder.com/800x500.png?text=Foto+1",
    "https://via.placeholder.com/800x500.png?text=Foto+2",
    "https://via.placeholder.com/800x500.png?text=Foto+3",
  ],
  location: {
    latitude: 20.6736,
    longitude: -103.344,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  },
};

function getStatusLabel(status) {
  switch (status) {
    case "approved":
      return "Aprobado";
    case "in_review":
      return "En revisión";
    case "returned":
      return "Devuelto";
    default:
      return "Sin estado";
  }
}

export default function VisualizedAddedPlaceScreen({ navigation }) {
  const place = MOCK_PLACE;
  const canEdit = place.status === "returned";

  return (
    <LayoutScreen>
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.headerRow}>
            <Pressable onPress={() => navigation.goBack()} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>✕</Text>
            </Pressable>

            <View style={styles.headerInfo}>
              <Text style={styles.placeName}>{place.name}</Text>
              <Text style={styles.submittedAt}>{place.submittedAtLabel}</Text>
            </View>

            <View style={styles.headerRight}>
              <Text style={styles.statusText}>{getStatusLabel(place.status)}</Text>

              {canEdit ? (
                <Pressable style={styles.editButton}>
                  <Text style={styles.editButtonText}>Editar</Text>
                </Pressable>
              ) : null}
            </View>
          </View>

          <PlaceSubmissionCarousel images={place.images} />

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Descripción</Text>
            <View style={styles.cardBox}>
              <Text style={styles.bodyText}>{place.description}</Text>
            </View>
          </View>

          <View style={styles.tagsRow}>
            {place.tags.map((tag, index) => (
              <View key={`${tag}-${index}`} style={styles.tagChip}>
                <Text style={styles.tagChipText}>{tag}</Text>
              </View>
            ))}
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Rango de precio</Text>
            <View style={styles.smallBox}>
              <Text style={styles.bodyText}>{place.priceLabel}</Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Mapa</Text>
            <SubmissionLocationMap region={place.location} />
          </View>
        </ScrollView>
      </View>
    </LayoutScreen>
  );
}