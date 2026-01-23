import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

import { LayoutScreen } from "../../../../layouts";
import styles from "./styles";

import Header from "./Components/Header";
import ProfilePhotoCard from "./Components/ProfilePhotoCard";
import ProfileFieldRow from "./Components/ProfileFieldRow";

export default function EditProfileScreen() {
  const navigation = useNavigation();
  const route = useRoute();

  // 🔧 Mock inicial (luego lo conectas a Firestore)
  const [name, setName] = useState("Mapache Filosófico");
  const [description, setDescription] = useState("Amante de lugares, café y caos controlado.");
  const [photoUri, setPhotoUri] = useState(null);

  // ✅ Recibir updates desde pantallas hijas
  useEffect(() => {
    const p = route.params;

    if (p?.updatedName != null) {
      setName(p.updatedName);
      navigation.setParams({ updatedName: undefined });
    }
    if (p?.updatedDescription != null) {
      setDescription(p.updatedDescription);
      navigation.setParams({ updatedDescription: undefined });
    }
    if (p?.updatedPhotoUri != null) {
      setPhotoUri(p.updatedPhotoUri);
      navigation.setParams({ updatedPhotoUri: undefined });
    }
  }, [route.params, navigation]);

  const goName = () => navigation.navigate("EditProfileNameScreen", { value: name });
  const goDescription = () =>
    navigation.navigate("EditProfileDescriptionScreen", { value: description, maxLen: 250 });
  const goPhoto = () => navigation.navigate("EditProfilePhotoScreen", { value: photoUri });

  return (
    <LayoutScreen
      scroll
      edges={["top"]}
      padding={{ top: 16, left: 16, right: 16, bottom: 24 }}
      bg="#FFFFFF"
    >
      <Header title="Editar perfil" onBack={() => navigation.goBack()} />

      <View style={styles.card}>
        <ProfilePhotoCard uri={photoUri} onPress={goPhoto} />
        <ProfileFieldRow label="Nombre:" value={name} onPress={goName} />
        <ProfileFieldRow
          label="Descripcion:"
          value={description}
          multiline
          onPress={goDescription}
        />
      </View>

      {/* tu barra de navegación ya la pone tu Layout / Navigator */}
    </LayoutScreen>
  );
}
