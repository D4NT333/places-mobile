import React, { useMemo, useState } from "react";
import { View, Text, Alert } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { LayoutScreen } from "../../../layouts";

import styles from "./styles";
import ModalHeaderClose from "./Components/ModalHeader";
import TextField from "../LoginPasswordScreen/Components/TextField";
import PrimaryButton from "../LoginScreen/Components/PrimaryButton";

import recoverPasswordService from "../../../services/firebase/auth/recoverPassword.service";


export default function LoginRecoverScreen() {
  const navigation = useNavigation();
  const route = useRoute();

  const prefilledEmail = route.params?.email ?? "";
  const [email, setEmail] = useState(prefilledEmail);
const [isLoading, setIsLoading] = useState(false);

const cleanEmail = useMemo(() => {
  return email.trim().toLowerCase();
}, [email]);

const canSend = useMemo(() => {
  return cleanEmail.length > 0 && !isLoading;
}, [cleanEmail, isLoading]);

 const onRecoverPassword = async () => {
  if (!canSend) return;

  try {
    setIsLoading(true);

    await recoverPasswordService({
      email: cleanEmail,
    });

    Alert.alert(
      "Correo enviado",
      "Te enviamos un correo para restablecer tu contraseña."
    );
  } catch (error) {
    console.log("Error recuperando contraseña:", error);

    if (error?.code === "auth/user-not-found") {
      Alert.alert(
        "Cuenta no encontrada",
        "No existe una cuenta registrada con este correo."
      );
      return;
    }

    if (error?.code === "auth/wrong-provider") {
      Alert.alert(
        "Método incorrecto",
        error.message ||
          "Esta cuenta fue creada con Google. Inicia sesión con Google."
      );
      return;
    }

    if (error?.code === "auth/email-required") {
      Alert.alert("Correo requerido", "Ingresa tu correo para continuar.");
      return;
    }

    Alert.alert(
      "Error",
      "No pudimos enviar el correo de recuperación. Inténtalo de nuevo."
    );
  } finally {
    setIsLoading(false);
  }
};

  return (
    <LayoutScreen bg="#FFFFFF" edges={["top"]} padding={{ top: 14, left: 18, right: 18, bottom: 24 }}>
      <View style={styles.card}>
        <ModalHeaderClose title="Recuperar contraseña" onClose={() => navigation.goBack()} />

        <Text style={styles.desc}>
          Ingresa el correo con el que te registraste y te enviaremos un enlace para restablecer tu contraseña.
        </Text>

        <View style={styles.section}>
          <TextField
            value={email}
            onChangeText={setEmail}
            placeholder="Correo"
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <PrimaryButton
  label={isLoading ? "Enviando..." : "Enviar enlace"}
  onPress={onRecoverPassword}
  disabled={!canSend}
/>
        </View>
      </View>
    </LayoutScreen>
  );
}
