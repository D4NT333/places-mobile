import React, {
  useCallback,
  useMemo,
  useState,
} from "react";

import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";

import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";

import { LayoutScreen } from "../../../../layouts";

import PhotoCarousel from "./Components/PhotoCarousel";
import PhotoSubmissionInfo from "./Components/PhotoSubmissionInfo";

import getMyPhotoSubmissionDetailService from "../../../../services/api/submissions/photos/read/getMyPhotoSubmissionDetail.service";

import styles from "./styles";

export default function VisualizedAddedPhotosScreen() {
  const navigation = useNavigation();
  const route = useRoute();

  const submissionId =
    route.params?.submissionId ||
    route.params?.submission?.submissionId ||
    route.params?.submission?.id ||
    "";

  const [
    submission,
    setSubmission,
  ] = useState(null);

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    errorMessage,
    setErrorMessage,
  ] = useState("");

  const loadSubmission =
    useCallback(async () => {
      if (!submissionId) {
        setSubmission(null);
        setLoading(false);

        setErrorMessage(
          "No se encontró el identificador de la propuesta."
        );

        return;
      }

      try {
        setLoading(true);
        setErrorMessage("");

        const detail =
          await getMyPhotoSubmissionDetailService(
            submissionId
          );

        setSubmission(detail);
      } catch (error) {
        console.log(
          "Error cargando el detalle de fotografías:",
          error
        );

        setSubmission(null);

        setErrorMessage(
          error?.response?.data?.message ||
            error?.message ||
            "No fue posible cargar la propuesta."
        );
      } finally {
        setLoading(false);
      }
    }, [submissionId]);

  /*
   * Se consulta nuevamente cada vez que
   * la pantalla recibe foco.
   *
   * Así obtenemos el status actualizado
   * después de aprobar o rechazar desde web.
   */
  useFocusEffect(
    useCallback(() => {
      loadSubmission();
    }, [loadSubmission])
  );

  const photos = useMemo(() => {
    if (
      !Array.isArray(
        submission?.photos
      )
    ) {
      return [];
    }

    return submission.photos
      .map((photo, index) => {
        const uri =
          typeof photo === "string"
            ? photo
            : photo?.mediumUrl ||
              photo?.medium?.url ||
              photo?.url ||
              "";

        if (!uri) {
          return null;
        }

        return {
          id:
            photo?.photoId ||
            photo?.id ||
            `photo-${index}`,

          uri,

          order:
            Number.isInteger(
              photo?.order
            )
              ? photo.order
              : index,
        };
      })
      .filter(Boolean)
      .sort(
        (firstPhoto, secondPhoto) =>
          firstPhoto.order -
          secondPhoto.order
      );
  }, [submission?.photos]);

  const renderContent = () => {
    if (loading) {
      return (
        <View
          style={
            styles.centerContainer
          }
        >
          <ActivityIndicator
            size="large"
            color="#374151"
          />

          <Text
            style={styles.loadingText}
          >
            Cargando propuesta...
          </Text>
        </View>
      );
    }

    if (
      errorMessage ||
      !submission
    ) {
      return (
        <View
          style={
            styles.centerContainer
          }
        >
          <Text
            style={styles.errorText}
          >
            {errorMessage ||
              "No se encontró la propuesta."}
          </Text>

          <Pressable
            onPress={loadSubmission}
            style={({ pressed }) => [
              styles.retryButton,

              pressed &&
                styles.retryButtonPressed,
            ]}
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

    return (
      <ScrollView
        showsVerticalScrollIndicator={
          false
        }
        contentContainerStyle={
          styles.content
        }
      >
        <PhotoCarousel
          photos={photos}
        />

        <PhotoSubmissionInfo
          placeName={
            submission.placeName ||
            "Lugar sin nombre"
          }
          status={
            submission.status ||
            "in_review"
          }
          createdAt={
            submission.createdAt
          }
          submittedAtLabel=""
          tagLabel={
            submission.tagLabel ||
            ""
          }
          subtags={
            Array.isArray(
              submission.subtags
            )
              ? submission.subtags
              : []
          }
          approaches={
            Array.isArray(
              submission.approaches
            )
              ? submission.approaches
              : []
          }
        />
      </ScrollView>
    );
  };

  return (
    <LayoutScreen>
      <View style={styles.container}>
        <View style={styles.header}>
          <Pressable
            onPress={() =>
              navigation.goBack()
            }
            hitSlop={12}
            style={({ pressed }) => [
              styles.closeButton,

              pressed &&
                styles.closeButtonPressed,
            ]}
          >
            <Text
              style={
                styles.closeButtonText
              }
            >
              ×
            </Text>
          </Pressable>

          <Text
            style={styles.headerTitle}
          >
            Fotos añadidas
          </Text>
        </View>

        {renderContent()}
      </View>
    </LayoutScreen>
  );
}