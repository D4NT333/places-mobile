import React, { useMemo, useState } from "react";
import { Alert, Text, View } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

import { LayoutScreen } from "../../../layouts";
import pickImages from "../../../services/images.service";

import AddPhotosHeader from "./Components/AddPhotosHeader";
import PhotosGrid from "./Components/PhotosGrid";
import SubmitPhotosButton from "./Components/SubmitPhotosButton";

import uploadPhotoSubmissionPhotosToStorageService, {deleteUploadedPhotoSubmissionPhotos,} from "../../../services/firebase/storage/photosubmission/uploadPhotoSubmissionPhotosToStorage.service";
import createPhotoSubmissionService from "../../../services/api/submissions/photos/create/createPhotoSubmission.service";

import styles from "./styles";

const MIN_PHOTOS = 1;
const MAX_PHOTOS = 6;

function getPhotoKey(photo, index) {
  return (
    photo?.assetId ||
    photo?.fileName ||
    photo?.uri ||
    `selected-photo-${index}`
  );
}

export default function AddPhotosScreen() {
  const navigation = useNavigation();
  const route = useRoute();

  const placeId = route.params?.placeId || "";
  const placeName = route.params?.placeName || "este lugar";

  const [photos, setPhotos] = useState([]);
  const [pickerLoading, setPickerLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const remainingPhotos = Math.max(MAX_PHOTOS - photos.length, 0);

  const photoCounterLabel = useMemo(() => {
    return `${photos.length} de ${MAX_PHOTOS} fotos`;
  }, [photos.length]);

  const handlePickImages = async () => {
    if (pickerLoading) return;

    if (photos.length >= MAX_PHOTOS) {
      Alert.alert(
        "Límite alcanzado",
        `Solo puedes seleccionar hasta ${MAX_PHOTOS} fotos.`
      );
      return;
    }

    try {
      setPickerLoading(true);

      const selectedAssets = await pickImages();

      if (!Array.isArray(selectedAssets) || selectedAssets.length === 0) {
        return;
      }

      setPhotos((currentPhotos) => {
        const currentUris = new Set(
          currentPhotos.map((photo) => photo?.uri).filter(Boolean)
        );

        const newPhotos = selectedAssets.filter((photo) => {
          if (!photo?.uri) return false;
          return !currentUris.has(photo.uri);
        });

        return [...currentPhotos, ...newPhotos].slice(0, MAX_PHOTOS);
      });
    } catch (error) {
      console.error("Error al seleccionar fotografías:", error);

      Alert.alert(
        "No se pudieron seleccionar las fotos",
        "Revisa los permisos de la galería e inténtalo nuevamente."
      );
    } finally {
      setPickerLoading(false);
    }
  };

  const handleRemovePhoto = (photoIndex) => {
    setPhotos((currentPhotos) =>
      currentPhotos.filter((_, index) => index !== photoIndex)
    );
  };

const handleSubmit = async () => {
  if (submitting) return;

  if (photos.length < MIN_PHOTOS) {
    Alert.alert(
      "Agrega una fotografía",
      "Debes seleccionar al menos una foto para continuar."
    );

    return;
  }

  if (!placeId) {
    Alert.alert(
      "No se encontró el lugar",
      "No fue posible obtener el identificador del lugar."
    );

    return;
  }

  try {
    setSubmitting(true);

    const photoSubmissionId =
      `photo_sub_${Date.now()}`;

    /*
     * Primero subimos las imágenes y obtenemos
     * sus rutas y URLs.
     */
    const uploadedPhotos =
      await uploadPhotoSubmissionPhotosToStorageService({
        photos,
        placeId,
        photoSubmissionId,
      });

    /*
     * Después registramos la propuesta en el backend.
     */
    await createPhotoSubmissionService({
      photoSubmissionId,
      placeId,
      photos: uploadedPhotos,
    });

    Alert.alert(
      "Fotos enviadas",
      "Tus fotografías fueron enviadas para revisión.",
      [
        {
          text: "Aceptar",
          onPress: () => navigation.goBack(),
        },
      ]
    );
  } catch (error) {
    console.error(
      "Error al enviar fotografías:",
      error
    );

    Alert.alert(
      "No se pudieron enviar las fotos",
      error?.response?.data?.message ||
        error?.message ||
        "Ocurrió un error inesperado."
    );
  } finally {
    setSubmitting(false);
  }
};
  return (
    <LayoutScreen
      scroll
      edges={["top"]}
      padding={{
        top: 0,
        left: 0,
        right: 0,
        bottom: 40,
      }}
      bg="#F6F7FB"
    >
      <View style={styles.screen}>
        <AddPhotosHeader
          placeName={placeName}
          onBack={() => navigation.goBack()}
        />

        <View style={styles.content}>
          <View style={styles.introductionCard}>
            <View style={styles.introductionIcon}>
              <Ionicons
                name="images-outline"
                size={25}
                color="#198754"
              />
            </View>

            <View style={styles.introductionTextContainer}>
              <Text style={styles.introductionTitle}>
                Comparte nuevas fotografías
              </Text>

              <Text style={styles.introductionDescription}>
                Ayuda a otras personas a conocer mejor este lugar agregando
                fotos claras y recientes.
              </Text>
            </View>
          </View>

          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleContainer}>
              <Text style={styles.sectionTitle}>Fotografías</Text>

              <Text style={styles.requiredLabel}>
                Mínimo {MIN_PHOTOS}
              </Text>
            </View>

            <Text style={styles.counter}>{photoCounterLabel}</Text>
          </View>

          <PhotosGrid
            photos={photos}
            maxPhotos={MAX_PHOTOS}
            pickerLoading={pickerLoading}
            getPhotoKey={getPhotoKey}
            onAddPhotos={handlePickImages}
            onRemovePhoto={handleRemovePhoto}
          />

          <View style={styles.helpCard}>
            <Ionicons
              name="information-circle-outline"
              size={21}
              color="#52606D"
            />

            <View style={styles.helpTextContainer}>
              <Text style={styles.helpTitle}>
                Antes de enviar
              </Text>

              <Text style={styles.helpText}>
                Evita fotos borrosas, capturas de pantalla o imágenes que no
                correspondan al lugar.
              </Text>
            </View>
          </View>

          <Text style={styles.remainingText}>
            {remainingPhotos === 0
              ? "Alcanzaste el máximo de fotografías."
              : `Puedes agregar ${remainingPhotos} ${
                  remainingPhotos === 1 ? "foto más" : "fotos más"
                }.`}
          </Text>

          <SubmitPhotosButton
            disabled={photos.length < MIN_PHOTOS}
            loading={submitting}
            onPress={handleSubmit}
          />
        </View>
      </View>
    </LayoutScreen>
  );
}