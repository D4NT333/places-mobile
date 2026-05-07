import React, { useState } from "react";
import { Image, Modal, Pressable, Text, View } from "react-native";

import { pickSingleImage } from "../../../../../../services";

import styles from "./styles";

export default function EditablePhotosBox({
  label,
  photos = [],
  reviewField,
  helperText,
  onChangeReplacementPhotos,
}) {
  
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [replacementPhotos, setReplacementPhotos] = useState({});

  const needsReview = Boolean(reviewField?.selected);

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

     setReplacementPhotos((prev) => {
      const next = {
        ...prev,
        [selectedPhoto.id]: pickedPhoto,
      };

      onChangeReplacementPhotos?.(next);

      return next;
    });

      setSelectedPhoto(null);
    } catch (error) {
      console.log("Error al seleccionar nueva foto:", error);
    }
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

  const selectedReplacementPhoto = selectedPhoto?.id
    ? replacementPhotos[selectedPhoto.id]
    : null;

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>

      <View style={[styles.box, needsReview && styles.boxReview]}>
        {photos.map((photo) => {
          const photoNeedsReview = Boolean(photo.selected);
          const replacementPhoto = replacementPhotos[photo.id];

          return (
            <View key={photo.id} style={styles.photoItem}>
              <View style={styles.photoHeader}>
                <Text style={styles.photoTitle}>{photo.label}</Text>

                {photoNeedsReview && (
                  <Pressable
                    onPress={() => handleOpenPhotoModal(photo)}
                    hitSlop={8}
                  >
                    <Text style={styles.editText}>
                      {replacementPhoto ? "Cambiar" : "Editar"}
                    </Text>
                  </Pressable>
                )}
              </View>

              {renderPhotoPreview(
                replacementPhoto || photo,
                photoNeedsReview && styles.photoPlaceholderReview
              )}

              <Text
                style={[
                  styles.photoHelper,
                  photoNeedsReview && styles.photoHelperReview,
                ]}
              >
                {replacementPhoto
                  ? "Nueva foto seleccionada."
                  : photoNeedsReview
                  ? photo.message || "Esta foto requiere revisión."
                  : "texto"}
              </Text>
            </View>
          );
        })}
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
                "Selecciona una nueva foto para reemplazar esta imagen."}
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
                    <Text style={styles.comparePhotoText}>Nueva foto</Text>
                  </View>
                )}
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}