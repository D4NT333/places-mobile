import React, { useState } from "react";
import { Modal, Pressable, Text, View } from "react-native";

import styles from "./styles";

export default function EditablePhotosBox({
  label,
  photos = [],
  reviewField,
  helperText,
}) {
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const needsReview = Boolean(reviewField?.selected);

  const handleOpenPhotoModal = (photo) => {
    setSelectedPhoto(photo);
  };

  const handleClosePhotoModal = () => {
    setSelectedPhoto(null);
  };

  const handleSelectNewPhoto = () => {
    console.log("Aquí irá ImagePicker para foto:", selectedPhoto?.id);

    /**
     * Luego aquí:
     * 1. Abres ImagePicker.
     * 2. Guardas la nueva imagen en estado.
     * 3. Cierras modal.
     */
    setSelectedPhoto(null);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>

      <View style={[styles.box, needsReview && styles.boxReview]}>
        {photos.map((photo) => {
          const photoNeedsReview = Boolean(photo.selected);

          return (
            <View key={photo.id} style={styles.photoItem}>
              <View style={styles.photoHeader}>
                <Text style={styles.photoTitle}>{photo.label}</Text>

                {photoNeedsReview && (
                  <Pressable
                    onPress={() => handleOpenPhotoModal(photo)}
                    hitSlop={8}
                  >
                    <Text style={styles.editText}>Editar</Text>
                  </Pressable>
                )}
              </View>

              <View
                style={[
                  styles.photoPlaceholder,
                  photoNeedsReview && styles.photoPlaceholderReview,
                ]}
              />

              <Text
                style={[
                  styles.photoHelper,
                  photoNeedsReview && styles.photoHelperReview,
                ]}
              >
                {photoNeedsReview ? photo.message || "texto" : "texto"}
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
                <Text style={styles.compareLabel}>Old</Text>

                <View style={styles.comparePhotoBox}>
                  <Text style={styles.comparePhotoText}>
                    {selectedPhoto?.label}
                  </Text>
                </View>
              </View>

              <Text style={styles.arrowText}>→</Text>

              <Pressable
                style={styles.photoCompareColumn}
                onPress={handleSelectNewPhoto}
              >
                <Text style={styles.compareLabel}>New</Text>

                <View style={styles.comparePhotoBox}>
                  <Text style={styles.comparePhotoText}>Nueva foto</Text>
                </View>
              </Pressable>
            </View>

            <Pressable
              style={styles.modalButton}
              onPress={handleSelectNewPhoto}
            >
              <Text style={styles.modalButtonText}>Seleccionar nueva foto</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}