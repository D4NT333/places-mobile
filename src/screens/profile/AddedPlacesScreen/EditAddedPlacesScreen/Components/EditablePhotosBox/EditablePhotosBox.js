import React, { useMemo, useState } from "react";
import { Alert, Image, Modal, Pressable, Text, View } from "react-native";

import { pickSingleImage } from "../../../../../../services";

import styles from "./styles";

export default function EditablePhotosBox({
  label,
  photos = [],
  reviewField,
  helperText,
  minPhotos = 3,
  maxPhotos = 6,
  onChangePhotoCorrections,
}) {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [photoCorrections, setPhotoCorrections] = useState({});

  const needsReview = Boolean(reviewField?.selected);

  const addedPhotos = useMemo(() => {
    return Object.entries(photoCorrections)
      .filter(([, correction]) => correction?.type === "add")
      .map(([id, correction], index) => ({
        id,
        label: `Foto nueva ${index + 1}`,
        photo: correction.photo,
      }));
  }, [photoCorrections]);

  const visiblePhotosCount = useMemo(() => {
    const corrections = Object.values(photoCorrections);

    const deletedCount = corrections.filter(
      (correction) => correction?.type === "delete"
    ).length;

    const addedCount = corrections.filter(
      (correction) => correction?.type === "add"
    ).length;

    return photos.length - deletedCount + addedCount;
  }, [photos.length, photoCorrections]);

  const emitCorrections = (next) => {
    setPhotoCorrections(next);
    onChangePhotoCorrections?.(next);
  };

  const handleOpenPhotoModal = (photo) => {
    setSelectedPhoto(photo);
  };

  const handleClosePhotoModal = () => {
    setSelectedPhoto(null);
  };

  const handleSelectNewPhoto = async () => {
    if (!selectedPhoto?.id) return;

    try {
      const pickedPhoto = await pickSingleImage();

      if (!pickedPhoto) return;

      const next = {
        ...photoCorrections,
        [selectedPhoto.id]: {
          type: "replace",
          photo: pickedPhoto,
        },
      };

      emitCorrections(next);
      setSelectedPhoto(null);
    } catch (error) {
      console.log("Error al seleccionar nueva foto:", error);

      Alert.alert(
        "Foto no válida",
        error?.message || "No se pudo seleccionar la foto."
      );
    }
  };

  const handleAddPhoto = async () => {
    if (!needsReview) {
      Alert.alert(
        "Fotos no disponibles",
        "Solo puedes agregar fotos cuando las fotos fueron señaladas para revisión."
      );
      return;
    }

    if (visiblePhotosCount >= maxPhotos) {
      Alert.alert(
        "Límite alcanzado",
        `La propuesta no puede tener más de ${maxPhotos} fotos.`
      );
      return;
    }

    try {
      const pickedPhoto = await pickSingleImage();

      if (!pickedPhoto) return;

      const newPhotoKey = `add_${Date.now()}`;

      const next = {
        ...photoCorrections,
        [newPhotoKey]: {
          type: "add",
          photo: pickedPhoto,
        },
      };

      emitCorrections(next);
    } catch (error) {
      console.log("Error al agregar foto:", error);

      Alert.alert(
        "Foto no válida",
        error?.message || "No se pudo seleccionar la foto."
      );
    }
  };

  const handleDeletePhoto = () => {
  if (!selectedPhoto?.id) return;

  const next = {
    ...photoCorrections,
    [selectedPhoto.id]: {
      type: "delete",
    },
  };

  emitCorrections(next);
  setSelectedPhoto(null);
};

  const handleUndoCorrection = (photoId) => {
    const next = { ...photoCorrections };
    delete next[photoId];

    emitCorrections(next);
  };

  const handleRemoveAddedPhoto = (photoId) => {
    const next = { ...photoCorrections };
    delete next[photoId];

    emitCorrections(next);
  };

  const getPhotoUri = (photo) => {
    if (!photo) return null;

    return (
      photo.uri ||
      photo.url ||
      photo.previewURL ||
      photo.thumbnailURL ||
      photo.mediumURL ||
      photo.downloadURL ||
      photo.imageUrl ||
      null
    );
  };

  const renderPhotoPreview = (photo, customBoxStyle) => {
    const photoUri = getPhotoUri(photo);

    return (
      <View style={[styles.photoPlaceholder, customBoxStyle]}>
        {photoUri ? (
          <Image
            source={{ uri: photoUri }}
            style={styles.photoImage}
            resizeMode="cover"
          />
        ) : (
          <Text style={styles.emptyPhotoText}>Sin foto</Text>
        )}
      </View>
    );
  };

  const selectedCorrection = selectedPhoto?.id
    ? photoCorrections[selectedPhoto.id]
    : null;

  const selectedReplacementPhoto =
    selectedCorrection?.type === "replace" ? selectedCorrection.photo : null;

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>

        <Text style={styles.helperText}>
      Puedes eliminar fotos y agregar nuevas. Al reenviar deben quedar entre{" "}
      {minPhotos} y {maxPhotos} fotos. Actualmente quedarían {visiblePhotosCount}.
    </Text>

      <View style={[styles.box, needsReview && styles.boxReview]}>
        {photos.map((photo) => {
          const photoNeedsReview = Boolean(photo.selected);
          const correction = photoCorrections[photo.id];

          const isDeleted = correction?.type === "delete";
          const replacementPhoto =
            correction?.type === "replace" ? correction.photo : null;

          return (
            <View
              key={photo.id}
              style={[
                styles.photoItem,
                isDeleted && styles.photoItemDeleted,
              ]}
            >
              <View style={styles.photoHeader}>
                <Text style={styles.photoTitle}>{photo.label}</Text>

                {photoNeedsReview && !isDeleted && (
                  <Pressable
                    onPress={() => handleOpenPhotoModal(photo)}
                    hitSlop={8}
                  >
                    <Text style={styles.editText}>
                      {replacementPhoto ? "Cambiar" : "Editar"}
                    </Text>
                  </Pressable>
                )}

                {photoNeedsReview && isDeleted && (
                  <Pressable
                    onPress={() => handleUndoCorrection(photo.id)}
                    hitSlop={8}
                  >
                    <Text style={styles.editText}>Deshacer</Text>
                  </Pressable>
                )}
              </View>

              {isDeleted ? (
                <View style={styles.photoPlaceholderDeleted}>
                  <Text style={styles.emptyPhotoText}>Foto eliminada</Text>
                </View>
              ) : (
                renderPhotoPreview(
                  replacementPhoto || photo,
                  photoNeedsReview && styles.photoPlaceholderReview
                )
              )}

              <Text
                style={[
                  styles.photoHelper,
                  photoNeedsReview && styles.photoHelperReview,
                ]}
              >
                {isDeleted
                  ? "Esta foto será eliminada."
                  : replacementPhoto
                    ? "Nueva foto seleccionada."
                    : photoNeedsReview
                      ? photo.message || "Esta foto requiere revisión."
                      : "Foto sin observaciones."}
              </Text>
            </View>
          );
        })}

        {addedPhotos.map((item) => (
          <View key={item.id} style={styles.photoItem}>
            <View style={styles.photoHeader}>
              <Text style={styles.photoTitle}>{item.label}</Text>

              <Pressable
                onPress={() => handleRemoveAddedPhoto(item.id)}
                hitSlop={8}
              >
                <Text style={styles.editText}>Quitar</Text>
              </Pressable>
            </View>

            {renderPhotoPreview(item.photo, styles.photoPlaceholderReview)}

            <Text style={[styles.photoHelper, styles.photoHelperReview]}>
              Esta foto nueva se agregará al reenviar la propuesta.
            </Text>
          </View>
        ))}

        {needsReview && (
  <View style={styles.addPhotoButtonRow}>
    <Pressable
      onPress={handleAddPhoto}
      disabled={visiblePhotosCount >= maxPhotos}
      style={({ pressed }) => [
        styles.addPhotoButton,
        visiblePhotosCount >= maxPhotos && styles.addPhotoButtonDisabled,
        pressed &&
          visiblePhotosCount < maxPhotos &&
          styles.addPhotoButtonPressed,
      ]}
    >
      <Text
        style={[
          styles.addPhotoButtonText,
          visiblePhotosCount >= maxPhotos &&
            styles.addPhotoButtonTextDisabled,
        ]}
      >
        {visiblePhotosCount >= maxPhotos
          ? `Máximo ${maxPhotos} fotos`
          : "Agregar foto"}
      </Text>
    </Pressable>
  </View>
)}
      </View>

      {!!helperText && (
        <Text style={[styles.helperText, needsReview && styles.helperReview]}>
          {helperText}
        </Text>
      )}

      <Modal
        visible={Boolean(selectedPhoto)}
        transparent
        animationType="fade"
        onRequestClose={handleClosePhotoModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Editar foto</Text>

              <Pressable onPress={handleClosePhotoModal} hitSlop={10}>
                <Text style={styles.modalClose}>x</Text>
              </Pressable>
            </View>

            <Text style={styles.modalMessage}>
              {selectedPhoto?.message ||
                "Puedes reemplazar esta foto o eliminarla si no es necesaria."}
            </Text>

            <View style={styles.photoCompareRow}>
              <View style={styles.photoCompareColumn}>
                <Text style={styles.compareLabel}>Anterior</Text>
                {renderPhotoPreview(selectedPhoto, styles.comparePhotoBox)}
              </View>

              <Text style={styles.arrowText}>→</Text>

              <Pressable
                style={styles.photoCompareColumn}
                onPress={handleSelectNewPhoto}
              >
                <Text style={styles.compareLabel}>Nueva</Text>

                {selectedReplacementPhoto ? (
                  renderPhotoPreview(
                    selectedReplacementPhoto,
                    styles.comparePhotoBox
                  )
                ) : (
                  <View style={styles.comparePhotoBox}>
                    <Text style={styles.comparePhotoText}>Reemplazar</Text>
                  </View>
                )}
              </Pressable>
            </View>

            <View style={styles.modalActions}>
              <Pressable
                style={styles.deleteButton}
                onPress={handleDeletePhoto}
              >
                <Text style={styles.deleteButtonText}>Eliminar foto</Text>
              </Pressable>

              <Pressable
                style={styles.cancelButton}
                onPress={handleClosePhotoModal}
              >
                <Text style={styles.cancelButtonText}>Cancelar</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}