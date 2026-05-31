import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import { LayoutScreen } from "../../../../layouts";
import styles from "./styles";

import { icons } from "../../../../../assets/icons";

import WarningCard from "./Components/WarningCard";
import BulletList from "./Components/BulletList";
import PasswordPill from "./Components/PasswordPill";
import CheckRow from "./Components/CheckRow";
import ActionButtons from "./Components/ActionButtons";
import GoogleConfirmButton from "./Components/GoogleConfirmButton";

export default function EliminateAccountScreen() {
  const navigation = useNavigation();

  const [password, setPassword] = useState("");
  const [accepted, setAccepted] = useState(false);
  const [googleConfirmed, setGoogleConfirmed] = useState(false);

  // Por ahora maqueta. Luego esto vendrá de Firebase:
  const providerId = "google.com"; // "password" | "google.com"

  const isPasswordUser = providerId === "password";
  const isGoogleUser = providerId === "google.com";

  const deleteItems = useMemo(
    () => [
      "Tu perfil será eliminado permanentemente",
      "Tus favoritos y lugares guardados",
      "Tus propuestas de lugares",
      "Tus comentarios y reportes asociados",
    ],
    []
  );

  const canDelete = isPasswordUser
  ? password.trim().length > 0 && accepted
  : googleConfirmed && accepted;

  const handleDelete = () => {
    if (!accepted) {
      Alert.alert(
        "Confirmación requerida",
        "Debes confirmar que entiendes que esta acción es permanente."
      );
      return;
    }

    if (isPasswordUser && !password.trim()) {
      Alert.alert(
        "Contraseña requerida",
        "Ingresa tu contraseña actual para continuar."
      );
      return;
    }

    Alert.alert(
      "Eliminar cuenta",
      "Esta acción no se puede deshacer. ¿Deseas continuar?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: isGoogleUser ? "Confirmar con Google" : "Eliminar",
          style: "destructive",
          onPress: () => {
            console.log("Eliminar cuenta");
            // Aquí después conectamos:
            // password -> reauthenticateWithCredential
            // google -> reauthenticateWithCredential con Google
            // backend -> borrar datos
            // auth.currentUser.delete()
          },
        },
      ]
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.keyboardView}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <LayoutScreen
        scroll
        edges={["top"]}
        padding={{ top: 16, left: 16, right: 16, bottom: 28 }}
        bg="#FFFFFF"
      >
        <View style={styles.header}>
      <Pressable
        onPress={() => navigation.goBack()}
        style={styles.backButton}
        hitSlop={12}
      >
        <Image source={icons.flecha} style={styles.backIcon} />
      </Pressable>

      <Text style={styles.headerTitle}>Eliminar cuenta</Text>

      <View style={styles.headerSpacer} />
    </View>

        <View style={styles.container}>
          <WarningCard />

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Se eliminará lo siguiente:</Text>

            <BulletList items={deleteItems} />
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Verificación de seguridad</Text>

            {isPasswordUser && (
              <>
                <Text style={styles.cardText}>
                  Para confirmar que eres tú, ingresa tu contraseña actual antes
                  de eliminar la cuenta.
                </Text>

                <PasswordPill
                  label="Contraseña actual"
                  value={password}
                  onChangeText={setPassword}
                />
              </>
            )}

            {isGoogleUser && (
              <>
                <Text style={styles.cardText}>
                  Tu cuenta fue creada con Google. Para eliminarla, primero confirma
                  nuevamente tu identidad.
                </Text>

                <GoogleConfirmButton
                  confirmed={googleConfirmed}
                  onPress={() => {
                    // Luego aquí conectamos reautenticación real con Google.
                    setGoogleConfirmed(true);
                  }}
                />
              </>
            )}
          </View>

          <CheckRow
            checked={accepted}
            onToggle={() => setAccepted((value) => !value)}
            label="Entiendo que esta acción es permanente y no podré recuperar mi cuenta."
          />

          <ActionButtons
            onCancel={() => navigation.goBack()}
            onDelete={handleDelete}
            disabled={!canDelete}
            deleteLabel="Eliminar cuenta"
          />

          <View style={styles.bottomSpace} />
        </View>
      </LayoutScreen>
    </KeyboardAvoidingView>
  );
}