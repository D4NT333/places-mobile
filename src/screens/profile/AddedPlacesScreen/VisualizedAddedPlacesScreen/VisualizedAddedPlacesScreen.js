import React, { useEffect, useMemo, useState } from "react";
import { ScrollView, Text, View, Pressable } from "react-native";
import { useRoute } from "@react-navigation/native";

import { LayoutScreen } from "../../../../layouts";
import PlaceSubmissionCarousel from "./Components/PlaceSubmissionCarousel";
import SubmissionLocationMap from "./Components/SubmissionLocationMap";

import {
  getOrFetchPlaceSubmissionDetail,
  getPlaceSubmissionDetailFromCache,
} from "../../../../services/api/placeSubmissionDetailCache.service";

import styles from "./styles";

function getStatusLabel(status) {
  switch (status) {
    case "approved":
      return "Aprobado";
    case "in_review":
      return "En revisión";
    case "returned":
      return "Devuelto";
    case "rejected":
      return "Rechazado";
    default:
      return "Sin estado";
  }
}

function formatDateLabel(dateValue, prefix = "Enviado") {
  if (!dateValue) return `${prefix} recientemente`;

  const date = new Date(dateValue);

  if (Number.isNaN(date.getTime())) {
    return `${prefix} recientemente`;
  }

  const months = [
    "enero",
    "febrero",
    "marzo",
    "abril",
    "mayo",
    "junio",
    "julio",
    "agosto",
    "septiembre",
    "octubre",
    "noviembre",
    "diciembre",
  ];

  const day = date.getDate();
  const month = months[date.getMonth()];

  return `${prefix} el ${day} de ${month}`;
}

function getImageUrls(detail) {
  if (!Array.isArray(detail?.photos)) return [];

  return detail.photos
    .map((photo) => {
      if (typeof photo === "string") return photo;

      return photo.url || photo.imageUrl || photo.downloadURL || photo.uri;
    })
    .filter(Boolean);
}

function getLocationRegion(detail) {
  const coordinates = detail?.coordinates || detail?.location;

  if (!coordinates) return null;

  const latitude = coordinates.latitude || coordinates.lat;
  const longitude = coordinates.longitude || coordinates.lng;

  if (!latitude || !longitude) return null;

  return {
    latitude,
    longitude,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };
}

function buildPlaceViewModel({ initialPlace, detail }) {
  const source = detail || {};

  const name = source.name || initialPlace?.name || "Lugar sin nombre";
  const status = source.status || initialPlace?.status || "in_review";

  const submittedAtLabel =
    initialPlace?.submittedAtLabel ||
    formatDateLabel(source.createdAt, "Enviado");

  const tag = source.tag || source.tagLabel || initialPlace?.tag || null;

  const subtags = Array.isArray(source.subtags)
    ? source.subtags
    : initialPlace?.subtags || [];

  const tags = [tag, ...subtags].filter(Boolean).slice(0, 4);

  const images = getImageUrls(source);

  if (images.length === 0 && initialPlace?.imageUrl) {
    images.push(initialPlace.imageUrl);
  }

  return {
    id: source.id || initialPlace?.id,
    name,
    submittedAtLabel,
    status,
    description:
      source.description ||
      "Descripción no disponible para esta propuesta.",
    tags,
    priceLabel: source.price || "Sin rango de precio",
    images,
    location: getLocationRegion(source),
  };
}

export default function VisualizedAddedPlaceScreen({ navigation }) {
  const route = useRoute();

  const { placeId, initialPlace } = route.params || {};

  const [detail, setDetail] = useState(() =>
    placeId ? getPlaceSubmissionDetailFromCache(placeId) : null
  );

  useEffect(() => {
    if (!placeId) return;

    let isMounted = true;

    getOrFetchPlaceSubmissionDetail(placeId)
      .then((data) => {
        if (isMounted) {
          setDetail(data);
        }
      })
      .catch((error) => {
        console.log("Error al cargar detalle de propuesta:", error);
      });

    return () => {
      isMounted = false;
    };
  }, [placeId]);

  const place = useMemo(
    () =>
      buildPlaceViewModel({
        initialPlace,
        detail,
      }),
    [initialPlace, detail]
  );

  const canEdit = place.status === "returned";

  const handleEdit = () => {
    navigation.navigate("EditAddedPlacesScreen", {
      placeId: place.id,
      initialPlace: place,
    });
  };

  return (
    <LayoutScreen>
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.headerRow}>
            <Pressable
              onPress={() => navigation.goBack()}
              style={styles.closeButton}
            >
              <Text style={styles.closeButtonText}>✕</Text>
            </Pressable>

            <View style={styles.headerInfo}>
              <Text style={styles.placeName}>{place.name}</Text>
              <Text style={styles.submittedAt}>{place.submittedAtLabel}</Text>
            </View>

            <View style={styles.headerRight}>
              <Text style={styles.statusText}>
                {getStatusLabel(place.status)}
              </Text>

              {canEdit ? (
                <Pressable style={styles.editButton} onPress={handleEdit}>
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