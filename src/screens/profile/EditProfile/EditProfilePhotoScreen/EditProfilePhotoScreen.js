import React, { useMemo, useState } from "react";
import { View, Text, Pressable, Image } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

import { LayoutScreen } from "../../../../layouts";
import styles from "./styles";
import ModalHeader from "../EditProfileNameScreen/Components/ModalHeader";

export default function EditProfilePhotoScreen() {
  const navigation = useNavigation();
  const route = useRoute();

  const initialUri = useMemo(() => route.params?.value ?? null, [route.params]);
  const [newUri, setNewUri] = useState(null);

  const onClose = () => navigation.goBack();
  const onSave = () => {
    navigation.navigate("EditProfileScreen", { updatedPhotoUri: newUri ?? initialUri });
    navigation.goBack();
  };

  const mockPick = () => {
    // 🔧 Placeholder: pon cualquier uri real después
    setNewUri("https://picsum.photos/300/300");
  };

  return (
    <LayoutScreen edges={["top"]} padding={{ top: 16, left: 16, right: 16, bottom: 16 }} bg="#FFF">
      <ModalHeader title="Foto de perfil" onClose={onClose} onSave={onSave} />

      <View style={styles.row}>
        <View style={styles.circle}>
          {initialUri ? (
            <Image source={{ uri: initialUri }} style={styles.img} />
          ) : (
            <Text style={styles.ph}>Foto de{"\n"}perfil{"\n"}actual</Text>
          )}
        </View>

        <Text style={styles.arrow}>→</Text>

        <View style={styles.circle}>
          {newUri ? (
            <Image source={{ uri: newUri }} style={styles.img} />
          ) : (
            <Text style={styles.ph}>Foto de{"\n"}perfil{"\n"}nueva</Text>
          )}
        </View>
      </View>

      <Pressable onPress={mockPick} style={styles.pickBtn}>
        <Text style={styles.pickText}>Seleccionar foto</Text>
      </Pressable>
    </LayoutScreen>
  );
}
