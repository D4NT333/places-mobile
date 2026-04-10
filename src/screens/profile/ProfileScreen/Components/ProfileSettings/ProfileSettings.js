import React, { useState } from "react";
import { View } from "react-native";

import { ProfileOption } from "../";
import styles from "./styles";

export default function ProfileSettings({
  onFavorites,
  onAddedPlaces,
  onAddedDescriptions,
  onAddedPhotos,
  onConfig,
}) {
  const [isAddedOpen, setIsAddedOpen] = useState(false);

  return (
    <View style={styles.container}>
      <ProfileOption
        label="Favoritos"
        icon="heart"
        onPress={onFavorites}
      />

      <ProfileOption
        label="Añadidos"
        icon="add"
        onPress={() => setIsAddedOpen((prev) => !prev)}
      />

      {isAddedOpen && (
        <View style={styles.dropdown}>
          <ProfileOption
            label="Lugares añadidos"
            isSubOption
            onPress={onAddedPlaces}
          />
          <ProfileOption
            label="Descripciones añadidas"
            isSubOption
            onPress={onAddedDescriptions}
          />
          <ProfileOption
            label="Fotos añadidas"
            isSubOption
            onPress={onAddedPhotos}
          />
        </View>
      )}

      <ProfileOption
        label="Configuración"
        icon="settings"
        onPress={onConfig}
      />
    </View>
  );
}