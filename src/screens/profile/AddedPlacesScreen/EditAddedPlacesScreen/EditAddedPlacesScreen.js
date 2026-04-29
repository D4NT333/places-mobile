import React, { useState } from "react";
import { ScrollView, View } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

import { LayoutScreen } from "../../../../layouts";

import {
  EditHeader,
  EditableTextField,
  EditableFiltersBox,
  EditablePhotosBox,
  EditableMapBox,
  SubmitAgainBox,
} from "./Components";

import styles from "./styles";

const MOCK_PLACE = {
  id: "3",
  name: "Nombre del lugar",
  description: "Texto",
  filters: [
    "Gastronomía",
    "Mexicana",
    "Vegana",
    "Accesibilidad",
    "Precio",
    "Popularidad",
  ],
  priceRange: "$150 - $299",
  photos: [
    { id: "1", label: "Foto1" },
    { id: "2", label: "Foto2" },
    { id: "3", label: "Foto3" },
    { id: "4", label: "Foto4" },
  ],
  mapLabel: "ubicacion",
};

export default function EditAddedPlacesScreen() {
  const navigation = useNavigation();
  const route = useRoute();

  const { placeId } = route.params || {};

  const [name, setName] = useState(MOCK_PLACE.name);
  const [description, setDescription] = useState(MOCK_PLACE.description);
  const [priceRange, setPriceRange] = useState(MOCK_PLACE.priceRange);

  const handleClose = () => {
    navigation.goBack();
  };

  const handleEditFilters = () => {
    console.log("Editar filtros del lugar:", placeId);
  };

  const handleEditPhotos = () => {
    console.log("Editar fotos del lugar:", placeId);
  };

  const handleEditMap = () => {
    console.log("Editar mapa del lugar:", placeId);
  };

  const handleSubmitAgain = () => {
    console.log("Enviar de nuevo lugar:", {
      placeId,
      name,
      description,
      priceRange,
    });
  };

  return (
    <LayoutScreen
      padding={{ top: 16, left: 16, right: 16, bottom: 16 }}
      bg="#538de4ff"
      edges={["top"]}
    >
      <View style={styles.screenCard}>
        <EditHeader title="Revisión requerida" onClose={handleClose} />

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <EditableTextField
            label="Nombre"
            value={name}
            onChangeText={setName}
            placeholder="Nombre del lugar"
            helperText="Texto"
          />

          <EditableTextField
            label="Descripción"
            value={description}
            onChangeText={setDescription}
            placeholder="Descripción"
            helperText="Texto"
            multiline
          />

          <EditableFiltersBox
            label="Filtros"
            filters={MOCK_PLACE.filters}
            helperText="Texto"
            onPress={handleEditFilters}
          />

          <EditableTextField
            label="Rango de precio"
            value={priceRange}
            onChangeText={setPriceRange}
            placeholder="Rango de precio"
            helperText="Texto"
          />

          <EditablePhotosBox
            label="Fotos"
            photos={MOCK_PLACE.photos}
            onPress={handleEditPhotos}
          />

          <EditableMapBox
            label="Mapa"
            mapLabel={MOCK_PLACE.mapLabel}
            helperText="Ajusta el pin al acceso principal del lugar."
            onPress={handleEditMap}
          />

          <SubmitAgainBox onSubmit={handleSubmitAgain} />
        </ScrollView>

      </View>
    </LayoutScreen>
  );
}