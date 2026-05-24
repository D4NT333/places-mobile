import React, { useState } from "react";
import { View, Text, Pressable, Image } from "react-native";
import styles from "./styles";
import { pickImages } from "../../../../../services";

export default function PhotoPicker({ photos = [], onChangePhotos }) {
  const MIN_PHOTOS = 3;
  const MAX_PHOTOS = 6;

  const PHOTO_QUALITY_RULES = {
  minShortSide: 720,
  minLongSide: 1280,

  maxTotalPixels: 40_000_000,

  minFileSizeKB: 60,
  maxFileSizeMB: 35,

  maxAspectRatio: 2.3,
};

  const [showMinPhotosWarning, setShowMinPhotosWarning] = useState(false);
  const [showMaxPhotosWarning, setShowMaxPhotosWarning] = useState(false);
  const [showQualityWarning, setShowQualityWarning] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  const [isPickingImages, setIsPickingImages] = useState(false);

  const validatePhotoQuality = (photo) => {
  const width = photo.width || 0;
  const height = photo.height || 0;
  const fileSize = photo.fileSize || 0;

  if (!width || !height) {
    return false;
  }

  const shortSide = Math.min(width, height);
  const longSide = Math.max(width, height);
  const totalPixels = width * height;
  const aspectRatio = longSide / shortSide;

  if (shortSide < PHOTO_QUALITY_RULES.minShortSide) {
    return false;
  }

  if (longSide < PHOTO_QUALITY_RULES.minLongSide) {
    return false;
  }

  if (totalPixels > PHOTO_QUALITY_RULES.maxTotalPixels) {
    return false;
  }

  if (aspectRatio > PHOTO_QUALITY_RULES.maxAspectRatio) {
    return false;
  }

  if (fileSize) {
    const sizeKB = fileSize / 1024;
    const sizeMB = fileSize / (1024 * 1024);

    if (sizeKB < PHOTO_QUALITY_RULES.minFileSizeKB) {
      return false;
    }

    if (sizeMB > PHOTO_QUALITY_RULES.maxFileSizeMB) {
      return false;
    }
  }

  return true;
};

  const validatePhotos = (photosToValidate) => {
    const total = photosToValidate.length;

    setShowMinPhotosWarning(hasInteracted && total < MIN_PHOTOS);
    setShowMaxPhotosWarning(total > MAX_PHOTOS);
  };

  const handlePickImages = async () => {
    try {
      setHasInteracted(true);
      setIsPickingImages(true);

      const t0 = Date.now();
      const selectedImages = await pickImages();
      console.log("A. pickImages terminó en:", Date.now() - t0, "ms");

      if (!selectedImages.length) {
        validatePhotos(photos);
        return;
      }

      const validSelectedImages = selectedImages.filter(validatePhotoQuality);
      const rejectedImagesCount =
        selectedImages.length - validSelectedImages.length;

      setShowQualityWarning(rejectedImagesCount > 0);

      if (!validSelectedImages.length) {
        validatePhotos(photos);
        return;
      }

      const updatedPhotos = [...photos, ...validSelectedImages];

      if (updatedPhotos.length > MAX_PHOTOS) {
        setShowMaxPhotosWarning(true);
        setShowMinPhotosWarning(false);
        return;
      }

      const t1 = Date.now();
      onChangePhotos(updatedPhotos);
      console.log("B. onChangePhotos ejecutado en:", Date.now() - t1, "ms");

      setShowMaxPhotosWarning(false);
      setShowMinPhotosWarning(updatedPhotos.length < MIN_PHOTOS);

      requestAnimationFrame(() => {
        console.log("C. Primer frame después de actualizar fotos");
      });
    } catch (error) {
      console.error("Error al seleccionar fotos:", error);
    } finally {
      setIsPickingImages(false);
    }
  };

  const handleRemovePhoto = (indexToRemove) => {
    const updatedPhotos = photos.filter((_, index) => index !== indexToRemove);
    onChangePhotos(updatedPhotos);

    setHasInteracted(true);
    setShowMaxPhotosWarning(false);
    setShowQualityWarning(false);
    setShowMinPhotosWarning(updatedPhotos.length < MIN_PHOTOS);
  };

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Fotos</Text>

      {photos.length === 0 ? (
        <>
          <Text style={styles.subtitle}>
            Agrega entre 3 y 6 fotos.
          </Text>

          <Pressable style={styles.button} onPress={handlePickImages}>
            <Text style={styles.buttonText}>Elegir fotos</Text>
          </Pressable>
        </>
      ) : (
        <>
          <Text style={styles.counter}>
            {photos.length} foto(s) seleccionada(s)
          </Text>

          <View style={styles.previewGrid}>
            {photos.map((photo, index) => (
              <View style={styles.imageWrapper} key={`${photo.uri}-${index}`}>
                <Image
                  source={{ uri: photo.uri }}
                  style={styles.previewImage}
                />

                <Pressable
                  style={styles.removeButton}
                  onPress={() => handleRemovePhoto(index)}
                >
                  <Text style={styles.removeButtonText}>×</Text>
                </Pressable>
              </View>
            ))}
          </View>

          <Pressable style={styles.button} onPress={handlePickImages}>
            <Text style={styles.buttonText}>Cambiar fotos</Text>
          </Pressable>
        </>
      )}

      {showMinPhotosWarning && (
        <Text style={styles.inputErrorText}>
          Selecciona al menos 3 fotos.
        </Text>
      )}

      {showMaxPhotosWarning && (
        <Text style={styles.inputErrorText}>
          El máximo permitido es 6 fotos.
        </Text>
      )}

      {showQualityWarning && (
        <Text style={styles.inputErrorText}>
          Algunas fotos tienen baja calidad. Selecciona imágenes más claras y con mejor resolución.
        </Text>
      )}
    </View>
  );
}