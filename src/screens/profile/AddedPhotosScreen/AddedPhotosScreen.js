import React, {
  useCallback,
  useState,
} from "react";

import {
  ActivityIndicator,
  Alert,
  Image,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";

import {
  useFocusEffect,
  useNavigation,
} from "@react-navigation/native";

import { LayoutScreen } from "../../../layouts";

import AddedPhotoCard from "./Components/AddedPhotoCard";

import getMyPhotoSubmissionsService from "../../../services/api/submissions/photos/read/getMyPhotoSubmissions.service";

import { icons } from "../../../../assets/icons";

import styles from "./styles";

export default function AddedPhotosScreen() {
  const navigation = useNavigation();

  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] =
    useState(true);

  const [
    errorMessage,
    setErrorMessage,
  ] = useState("");

  const loadPhotos = useCallback(
    async () => {
      try {
        setLoading(true);
        setErrorMessage("");

        const submissions =
          await getMyPhotoSubmissionsService();

        setPhotos(submissions);
      } catch (error) {
        console.log(
          "Error al cargar fotografías añadidas:",
          error
        );

        setErrorMessage(
          "No fue posible cargar tus fotografías añadidas."
        );
      } finally {
        setLoading(false);
      }
    },
    []
  );

  useFocusEffect(
    useCallback(() => {
      loadPhotos();
    }, [loadPhotos])
  );

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleOpenDetails = (
    photo
  ) => {
    const submissionId =
      photo.submissionId ||
      photo.id;

    navigation.navigate(
      "VisualizedAddedPhotosScreen",
      {
        submissionId,

        // Lo mandamos completo por si después
        // quieres usar los datos del listado.
        submission: photo,
      }
    );
  };

  const handleDelete = (
    photoId
  ) => {
    console.log(
      "Eliminar propuesta de fotografía:",
      photoId
    );
  };

  const handleViewReason = (
    photoId
  ) => {
    const selectedPhoto =
      photos.find(
        (photo) =>
          photo.id === photoId ||
          photo.submissionId ===
            photoId
      );

    Alert.alert(
      "Motivo del rechazo",
      selectedPhoto?.rejectionReason ||
        "No se especificó un motivo de rechazo."
    );
  };

  const renderContent = () => {
    if (loading) {
      return (
        <View
          style={
            styles.loadingContainer
          }
        >
          <ActivityIndicator
            size="large"
          />

          <Text
            style={styles.loadingText}
          >
            Cargando fotografías...
          </Text>
        </View>
      );
    }

    if (errorMessage) {
      return (
        <View
          style={styles.emptyContainer}
        >
          <Text
            style={styles.errorText}
          >
            {errorMessage}
          </Text>

          <Pressable
            style={styles.retryButton}
            onPress={loadPhotos}
          >
            <Text
              style={
                styles.retryButtonText
              }
            >
              Intentar nuevamente
            </Text>
          </Pressable>
        </View>
      );
    }

    if (photos.length === 0) {
      return (
        <View
          style={styles.emptyContainer}
        >
          <Text
            style={styles.emptyText}
          >
            Aún no has añadido
            fotografías.
          </Text>
        </View>
      );
    }

    return photos.map((photo) => {
      const submissionId =
        photo.submissionId ||
        photo.id;

      return (
        <AddedPhotoCard
          key={submissionId}
          photo={photo}
          onPress={() =>
            handleOpenDetails(photo)
          }
          onDelete={handleDelete}
          onViewReason={
            handleViewReason
          }
        />
      );
    });
  };

  return (
    <LayoutScreen>
      <View style={styles.container}>
        <View style={styles.header}>
          <Pressable
            style={styles.backButton}
            onPress={handleGoBack}
            hitSlop={12}
          >
            <Image
              source={icons.flecha}
              style={styles.backIcon}
              resizeMode="contain"
            />
          </Pressable>

          <Text
            style={styles.headerTitle}
          >
            Fotos añadidas
          </Text>
        </View>

        <ScrollView
          contentContainerStyle={
            styles.content
          }
          showsVerticalScrollIndicator={
            false
          }
        >
          {renderContent()}
        </ScrollView>
      </View>
    </LayoutScreen>
  );
}