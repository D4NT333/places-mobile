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
      return "En revision";

    case "resubmitted":
      return "Corregido";

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

function getImageUrl(photo) {
  if (!photo) return null;

  if (typeof photo === "string") return photo;

  return (
    photo.displayUrl ||
    photo.mediumUrl ||
    photo.medium?.url ||
    photo.originalUrl ||
    photo.original?.url ||
    photo.thumbnailUrl ||
    photo.thumbnail?.url ||
    photo.url ||
    photo.imageUrl ||
    photo.fullUrl ||
    photo.downloadURL ||
    photo.mediumURL ||
    photo.thumbnailURL ||
    photo.uri ||
    photo.src ||
    null
  );
}

function getImageUrls(detail) {
  if (!Array.isArray(detail?.photos)) return [];

  return detail.photos
    .map(getImageUrl)
    .filter(Boolean);
}

function getLocationRegion(detail) {
  const coordinates = detail?.coordinates || detail?.location;

  if (!coordinates) return null;

  const latitude = Number(coordinates.latitude ?? coordinates.lat);
  const longitude = Number(coordinates.longitude ?? coordinates.lng);

  if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
    return null;
  }

  return {
    latitude,
    longitude,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };
}

function normalizeArray(value) {
  if (!value) return [];

  if (Array.isArray(value)) {
    return value.filter(Boolean);
  }

  if (typeof value === "string") {
    return [value];
  }

  return [];
}

function buildPlaceViewModel({ initialPlace, detail }) {
  const source = detail || {};

  const name = source.name || initialPlace?.name || "Lugar sin nombre";
  const status = source.status || initialPlace?.status || "in_review";

  const submittedAtLabel =
    initialPlace?.submittedAtLabel ||
    formatDateLabel(source.createdAt, "Enviado");

  const tag = source.tag || source.tagLabel || initialPlace?.tag || null;

  const subtags = normalizeArray(source.subtags).length
    ? normalizeArray(source.subtags)
    : normalizeArray(initialPlace?.subtags);

  const approaches = normalizeArray(source.approaches).length
  ? normalizeArray(source.approaches)
  : normalizeArray(source.approaches).length
  ? normalizeArray(source.approaches)
  : normalizeArray(initialPlace?.approaches).length
  ? normalizeArray(initialPlace?.approaches)
  : normalizeArray(initialPlace?.approaches);

  const tags = [tag, ...subtags, ...approaches]
    .filter(Boolean)
    .slice(0, 5);

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
  subtags,
  approaches,
  priceLabel: source.price || "Sin rango de precio",

  scheduleLabel:
    source.openingHours?.label ||
    source.schedule ||
    initialPlace?.openingHours?.label ||
    initialPlace?.schedule ||
    "Horario no especificado",

  openingHours:
    source.openingHours ||
    initialPlace?.openingHours ||
    null,

  images,

  location:
    getLocationRegion(source) ||
    getLocationRegion(initialPlace),
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
          console.log("DETALLE PROPUESTA:", data);
console.log("APPROACH DETAIL:", data?.approaches);
console.log("APPROACHES DETAIL:", data?.approaches);
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
    source: "added_places",
    shouldFetchReturnedEditData: true,
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
            <Text style={styles.sectionTitle}>Horario</Text>
            <View style={styles.smallBox}>
              <Text style={styles.bodyText}>{place.scheduleLabel}</Text>
            </View>
          </View>

          <View style={styles.section}>
  <Text style={styles.sectionTitle}>Mapa</Text>

  {place.location ? (
    <SubmissionLocationMap
      key={`${place.location.latitude}-${place.location.longitude}`}
      region={place.location}
    />
  ) : (
    <View style={styles.smallBox}>
      <Text style={styles.bodyText}>Cargando ubicación...</Text>
    </View>
  )}
</View>
        </ScrollView>
      </View>
    </LayoutScreen>
  );
}