import React, {
  useCallback,
  useState,
} from "react";

import {
  ActivityIndicator,
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

import PhotoRejectionReasonModal from "./Components/PhotoRejectionReasonModal";

import DeleteSubmissionModal from "../AddedPlacesScreen/Components/DeleteSubmissionModal";

import getMyPhotoSubmissionsService from "../../../services/api/submissions/photos/read/getMyPhotoSubmissions.service";

import getMyPhotoSubmissionRejectionReasonService from "../../../services/api/submissions/photos/read/getMyPhotoSubmissionRejectionReason.service";

import requestDeleteSubmissionService from "../../../services/api/submissions/requestDeleteSubmission.service";

import { icons } from "../../../../assets/icons";

import styles from "./styles";

export default function AddedPhotosScreen() {
  const navigation = useNavigation();

  const [
    photos,
    setPhotos,
  ] = useState([]);

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    errorMessage,
    setErrorMessage,
  ] = useState("");

  const [
    rejectionModalVisible,
    setRejectionModalVisible,
  ] = useState(false);

  const [
    rejectionLoading,
    setRejectionLoading,
  ] = useState(false);

  const [
    rejectionError,
    setRejectionError,
  ] = useState("");

  const [
    selectedRejection,
    setSelectedRejection,
  ] = useState(null);

  const [
    deleteModalVisible,
    setDeleteModalVisible,
  ] = useState(false);

  const [
    selectedPhotoToDelete,
    setSelectedPhotoToDelete,
  ] = useState(null);

  const [
    deletingSubmission,
    setDeletingSubmission,
  ] = useState(false);

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
        submission: photo,
      }
    );
  };

  const handleDelete = (
    photoId
  ) => {
    const selectedPhoto =
      photos.find((photo) => {
        const submissionId =
          photo.submissionId ||
          photo.id;

        return (
          submissionId === photoId
        );
      });

    if (!selectedPhoto) {
      return;
    }

    setSelectedPhotoToDelete(
      selectedPhoto
    );

    setDeleteModalVisible(true);
  };

  const handleCancelDelete = () => {
    if (deletingSubmission) {
      return;
    }

    setDeleteModalVisible(false);
    setSelectedPhotoToDelete(null);
  };

  const handleConfirmDelete =
    async () => {
      const submissionId =
        selectedPhotoToDelete
          ?.submissionId ||
        selectedPhotoToDelete?.id;

      if (!submissionId) {
        return;
      }

      if (deletingSubmission) {
        return;
      }

      try {
        setDeletingSubmission(true);

        const result =
          await requestDeleteSubmissionService({
            type: "photo",
            submissionId,
          });

        console.log(
          "Fotos enviadas a eliminación:",
          result
        );

        setPhotos((current) =>
          current.filter((photo) => {
            const currentId =
              photo.submissionId ||
              photo.id;

            return (
              currentId !==
              submissionId
            );
          })
        );

        setDeleteModalVisible(false);
        setSelectedPhotoToDelete(null);
      } catch (error) {
        console.log(
          "Error enviando fotos a eliminación:",
          error
        );

        alert(
          error?.response?.data
            ?.message ||
            error?.message ||
            "No se pudo enviar la propuesta de fotografías a eliminación."
        );
      } finally {
        setDeletingSubmission(false);
      }
    };

  const handleCloseRejectionModal =
    () => {
      if (rejectionLoading) {
        return;
      }

      setRejectionModalVisible(
        false
      );

      setSelectedRejection(null);
      setRejectionError("");
    };

  const handleViewReason =
    async (photoId) => {
      if (!photoId) {
        return;
      }

      setRejectionModalVisible(
        true
      );

      setRejectionLoading(true);
      setRejectionError("");
      setSelectedRejection(null);

      try {
        const rejection =
          await getMyPhotoSubmissionRejectionReasonService(
            photoId
          );

        setSelectedRejection(
          rejection
        );
      } catch (error) {
        console.log(
          "Error al cargar el motivo de rechazo:",
          error
        );

        setRejectionError(
          error?.response?.data
            ?.message ||
            error?.message ||
            "No fue posible obtener el motivo del rechazo."
        );
      } finally {
        setRejectionLoading(false);
      }
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
          style={
            styles.emptyContainer
          }
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
          style={
            styles.emptyContainer
          }
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

    return photos.map(
      (photo) => {
        const submissionId =
          photo.submissionId ||
          photo.id;

        return (
          <AddedPhotoCard
            key={submissionId}
            photo={photo}
            onPress={() =>
              handleOpenDetails(
                photo
              )
            }
            onDelete={
              handleDelete
            }
            onViewReason={
              handleViewReason
            }
          />
        );
      }
    );
  };

  return (
    <LayoutScreen>
      <View style={styles.container}>
        <View style={styles.header}>
          <Pressable
            style={
              styles.backButton
            }
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
            style={
              styles.headerTitle
            }
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

      <PhotoRejectionReasonModal
        visible={
          rejectionModalVisible
        }
        loading={
          rejectionLoading
        }
        errorMessage={
          rejectionError
        }
        rejection={
          selectedRejection
        }
        onClose={
          handleCloseRejectionModal
        }
      />

      <DeleteSubmissionModal
        visible={
          deleteModalVisible
        }
        title="Eliminar fotografías"
        itemName={
          selectedPhotoToDelete
            ?.placeName ||
          "esta propuesta de fotografías"
        }
        loading={
          deletingSubmission
        }
        onCancel={
          handleCancelDelete
        }
        onConfirm={
          handleConfirmDelete
        }
      />
    </LayoutScreen>
  );
}