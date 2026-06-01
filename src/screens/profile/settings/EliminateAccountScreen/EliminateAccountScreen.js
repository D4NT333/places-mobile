import React, { useEffect, useMemo, useState } from "react";
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
import { signOut } from "firebase/auth";

import { LayoutScreen } from "../../../../layouts";
import styles from "./styles";

import { icons } from "../../../../../assets/icons";

import { auth } from "../../../../services/firebase/config";

import { getMobileMeService } from "../../../../services/firebase/auth/getMobileMe.service";
import { deleteMyAccountService } from "../../../../services/firebase/auth/deleteMyAccount.service";
import { reauthenticatePasswordUserService } from "../../../../services/firebase/auth/reauthenticatePasswordUser.service";
import { reauthenticateGoogleUserService } from "../../../../services/firebase/auth/reauthenticateGoogleUser.service";

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

  const [account, setAccount] = useState(null);
  const [loadingAccount, setLoadingAccount] = useState(true);
  const [deleting, setDeleting] = useState(false);

  const [confirmingGoogle, setConfirmingGoogle] = useState(false);

  const providerId = account?.providerId || null;

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
    ? password.trim().length > 0 && accepted && !deleting
    : googleConfirmed && accepted && !deleting;

  useEffect(() => {
    let isMounted = true;

    const loadAccount = async () => {
      try {
        setLoadingAccount(true);

        const user = await getMobileMeService();

        if (!isMounted) return;

        setAccount(user);
      } catch (error) {
        console.error("Error cargando cuenta:", error);

        if (!isMounted) return;

        Alert.alert(
          "No se pudo cargar tu cuenta",
          error.message || "Intenta nuevamente."
        );

        navigation.goBack();
      } finally {
        if (isMounted) {
          setLoadingAccount(false);
        }
      }
    };

    loadAccount();

    return () => {
      isMounted = false;
    };
  }, [navigation]);

  const handleGoogleConfirm = async () => {
  if (confirmingGoogle || googleConfirmed) return;

  try {
    setConfirmingGoogle(true);

    await reauthenticateGoogleUserService();

    setGoogleConfirmed(true);

    Alert.alert(
      "Identidad confirmada",
      "Ya puedes continuar con la eliminación de tu cuenta."
    );
  } catch (error) {
    console.error("Error confirmando Google:", error);

    let message =
      error.message || "No se pudo confirmar tu identidad con Google.";

    if (error.code === "auth/user-mismatch") {
      message =
        "La cuenta de Google seleccionada no coincide con la cuenta actual.";
    }

    if (error.code === "auth/invalid-credential") {
      message = "No se pudo validar la credencial de Google.";
    }

    if (error.code === "auth/requires-recent-login") {
      message =
        "Por seguridad, vuelve a iniciar sesión e inténtalo nuevamente.";
    }

    Alert.alert("No se pudo confirmar", message);
  } finally {
    setConfirmingGoogle(false);
  }
};


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

    if (!isPasswordUser && !isGoogleUser) {
      Alert.alert(
        "Método no compatible",
        "No se pudo identificar el método de inicio de sesión de tu cuenta."
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
          text: "Eliminar",
          style: "destructive",
          onPress: async () => {
            try {
              setDeleting(true);

              if (isPasswordUser) {
                await reauthenticatePasswordUserService(password);
              }

              if (isGoogleUser && !googleConfirmed) {
                Alert.alert(
                  "Confirmación requerida",
                  "Primero confirma nuevamente tu identidad con Google."
                );
                return;
              }

              await deleteMyAccountService();

             Alert.alert(
  "Cuenta eliminada",
  "Tu cuenta fue eliminada correctamente.",
  [
    {
      text: "Aceptar",
      onPress: async () => {
        try {
          await signOut(auth);
        } catch (signOutError) {
          console.log(
            "No fue necesario cerrar sesión o la cuenta ya no existe:",
            signOutError?.message
          );
        }
      },
    },
  ],
  { cancelable: false }
);
            } catch (error) {
              console.error("Error eliminando cuenta:", error);

              let message =
                error.message || "No se pudo eliminar la cuenta.";

              if (
                error.code === "auth/invalid-credential" ||
                error.code === "auth/wrong-password"
              ) {
                message = "La contraseña ingresada no es correcta.";
              }

              if (error.code === "auth/too-many-requests") {
                message =
                  "Se hicieron demasiados intentos. Espera un momento e inténtalo nuevamente.";
              }

              if (error.code === "auth/requires-recent-login") {
                message =
                  "Por seguridad, vuelve a iniciar sesión e intenta eliminar la cuenta nuevamente.";
              }

              Alert.alert("No se pudo eliminar la cuenta", message);
            } finally {
              setDeleting(false);
            }
          },
        },
      ]
    );
  };

  if (loadingAccount) {
    return (
      <LayoutScreen
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
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Cargando cuenta</Text>
            <Text style={styles.cardText}>
              Estamos verificando tu método de inicio de sesión.
            </Text>
          </View>
        </View>
      </LayoutScreen>
    );
  }

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
            disabled={deleting}
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
                  Tu cuenta fue creada con Google. Para eliminarla, primero
                  confirma nuevamente tu identidad.
                </Text>

               <GoogleConfirmButton
                confirmed={googleConfirmed}
                loading={confirmingGoogle}
                onPress={handleGoogleConfirm}
              />
              </>
            )}

            {!isPasswordUser && !isGoogleUser && (
              <Text style={styles.cardText}>
                No se pudo identificar el método de inicio de sesión de esta
                cuenta.
              </Text>
            )}
          </View>

          <CheckRow
            checked={accepted}
            onToggle={() => {
              if (deleting) return;
              setAccepted((value) => !value);
            }}
            label="Entiendo que esta acción es permanente y no podré recuperar mi cuenta."
          />

          <ActionButtons
            onCancel={() => navigation.goBack()}
            onDelete={handleDelete}
            disabled={!canDelete}
            deleteLabel={deleting ? "Eliminando..." : "Eliminar cuenta"}
          />

          <View style={styles.bottomSpace} />
        </View>
      </LayoutScreen>
    </KeyboardAvoidingView>
  );
}