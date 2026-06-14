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

import {icons} from "../../../../assets/icons";

import styles from "./styles";

export default function AddedPhotosScreen() {
  const navigation = useNavigation();

  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const loadPhotos = useCallback(async () => {
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
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadPhotos();
    }, [loadPhotos])
  );

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleDelete = (photoId) => {
    console.log(
      "Eliminar propuesta de fotografía:",
      photoId
    );
  };

  const handleViewReason = (photoId) => {
    const selectedPhoto = photos.find(
      (photo) => photo.id === photoId
    );

    Alert.alert(
      "Motivo del rechazo",
      selectedPhoto?.rejectionReason ||
        "No se especificó un motivo de rechazo."
    );
  };

  const renderContent = () => {
    if (loading) {
      return <ActivityIndicator />;
    }

    if (errorMessage) {
      return (
        <Text>
          {errorMessage}
        </Text>
      );
    }

    if (photos.length === 0) {
      return (
        <Text>
          Aún no has añadido fotografías.
        </Text>
      );
    }

    return photos.map((photo) => (
      <AddedPhotoCard
        key={
          photo.submissionId ||
          photo.id
        }
        photo={photo}
        onDelete={handleDelete}
        onViewReason={handleViewReason}
      />
    ));
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

          <Text style={styles.headerTitle}>
            Fotos añadidas
          </Text>
        </View>

        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          {renderContent()}
        </ScrollView>
      </View>
    </LayoutScreen>
  );
}