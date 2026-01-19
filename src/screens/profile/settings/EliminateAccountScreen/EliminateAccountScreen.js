import React, { useState } from "react";
import { View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { LayoutScreen } from "../../../../layouts"; // ajusta ruta si cambia
import styles from "./styles";

// Reuso del mismo Header (sin crear carpetas nuevas)
import Header from "../ChangePasswordScreen/Components/Header";

import BulletList  from "./Components/BulletList";
import PasswordPill from "./Components/PasswordPill";
import CheckRow    from "./Components/CheckRow";
import ActionButtons from "./Components/ActionButtons";

export default function EliminateAccountScreen() {
  const navigation = useNavigation();

  // maqueta por ahora
  const [password, setPassword] = useState("");
  const [accepted, setAccepted] = useState(false);

  const bullets = [
    "Tu perfil será eliminado",
    "Se borrara tus favoritos",
    "No podras recuperar tu informacion",
    "Perderas acceso a Lsearch",
  ];

  return (
    <LayoutScreen
      scroll
      edges={["top"]}
      padding={{ top: 16, left: 16, right: 16, bottom: 24 }}
      bg="#FFFFFF"
    >
      <Header title="Eliminar cuenta" onBack={() => navigation.goBack()} />

      <Text style={styles.warningTitle}>Esta acción es permanente.</Text>
      <Text style={styles.warningSubtitle}>
        Perderás tu perfil, favoritos y lugares añadidos.
      </Text>

      <BulletList items={bullets} />

      <View style={styles.section}>
        <PasswordPill
          label="Contraseña actual:"
          value={password}
          onChangeText={setPassword}
        />
      </View>

      <View style={styles.section}>
        <CheckRow
          checked={accepted}
          onToggle={() => setAccepted((v) => !v)}
          label="Entiendo que esta accion es permanente"
        />
      </View>

      <View style={styles.footer}>
        <ActionButtons
          onCancel={() => navigation.goBack()}
          onDelete={() => {}}
        />
      </View>
    </LayoutScreen>
  );
}
