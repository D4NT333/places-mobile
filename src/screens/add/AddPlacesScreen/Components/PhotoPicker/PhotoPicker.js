import React from "react";
import { View, Text, Pressable, Image } from "react-native";
import styles from "./styles";
import { pickImages } from "../../../../../services";

export default function PhotoPicker({ photos = [], onChangePhotos }) {
  const handlePickImages = async () => {
    try {
      const selectedImages = await pickImages();

      if (!selectedImages.length) return;

      onChangePhotos(selectedImages);
    } catch (error) {
      console.error("Error al seleccionar fotos:", error);
    }
  };

  const handleRemovePhoto = (indexToRemove) => {
    const updatedPhotos = photos.filter((_, index) => index !== indexToRemove);
    onChangePhotos(updatedPhotos);
  };

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Fotos</Text>

      {photos.length === 0 ? (
        <>
          <Text style={styles.subtitle}>
            Placeholder (luego metemos image picker)
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
    </View>
  );
}