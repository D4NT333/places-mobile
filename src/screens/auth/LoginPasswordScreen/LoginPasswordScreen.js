import React, { useMemo, useState } from "react";
import { View, Alert } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

import { LayoutScreen } from "../../../layouts";

import {
  googleSignInService,
  syncSessionWithBackendService,
} from "../../../services";

import loginWithEmailService from "../../../services/firebase/auth/loginWithEmail.service";
import checkLoginMethodService from "../../../services/api/checkLoginMethod.service";

import styles from "./styles";
import ModalHeader from "./Components/ModalHeader";
import GoogleButton from "../LoginScreen/Components/GoogleButton";
import Divider from "../LoginScreen/Components/Divider";
import TextField from "./Components/TextField";
import PrimaryButton from "../LoginScreen/Components/PrimaryButton";
import TextLink from "./Components/TextLink";

export default function LoginPasswordScreen() {
  const navigation = useNavigation();
  const route = useRoute();

  const initialEmail = route.params?.email ?? "";

  const [email, setEmail] = useState(initialEmail);
  const [password, setPassword] = useState("");

  const [isLoginLoading, setIsLoginLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  // Se oculta al inicio y solo aparece después de un fallo de inicio de sesión
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const cleanEmail = useMemo(() => {
    return email.trim().toLowerCase();
  }, [email]);

  const canLogin = useMemo(() => {
    return cleanEmail.length > 0 && password.length >= 1 && !isLoginLoading;
  }, [cleanEmail, password, isLoginLoading]);

  const onChangeEmail = (value) => {
    setEmail(value);
    setShowForgotPassword(false);
  };

  const onChangePassword = (value) => {
    setPassword(value);
    setShowForgotPassword(false);
  };

  const onGoogle = async () => {
    if (isGoogleLoading) return;

    try {
      setIsGoogleLoading(true);

      const { firebaseUser } = await googleSignInService();

      const idToken = await firebaseUser.getIdToken(true);

      const sessionData = await syncSessionWithBackendService({ idToken });

      console.log("firebaseUser Google:", firebaseUser);
      console.log("sessionData Google:", sessionData);
    } catch (error) {
      console.log("Error login Google:", error);

      if (error?.code === "auth/wrong-provider") {
        Alert.alert(
          "Método de inicio incorrecto",
          error.message ||
            "Esta cuenta fue creada con correo y contraseña. Inicia sesión con correo y contraseña."
        );
        return;
      }

      Alert.alert(
        "Error",
        error?.message || "No se pudo iniciar sesión con Google."
      );
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const onLogin = async () => {
    if (!canLogin) return;

    try {
      setIsLoginLoading(true);

      const methodCheck = await checkLoginMethodService({
        email: cleanEmail,
        requestedProvider: "password",
      });

      if (methodCheck.exists && !methodCheck.allowed) {
        Alert.alert(
          "Método de inicio incorrecto",
          methodCheck.message ||
            "Esta cuenta fue creada con otro método de inicio de sesión."
        );
        return;
      }

      const { firebaseUser, sessionData } = await loginWithEmailService({
        email: cleanEmail,
        password,
      });

      console.log("firebaseUser Email:", firebaseUser);
      console.log("sessionData Email:", sessionData);
    } catch (error) {
      console.log("Error login correo/contraseña:", error);

      if (error?.code === "auth/email-not-verified") {
        Alert.alert(
          "Correo no verificado",
          "Revisa tu correo y confirma tu cuenta antes de iniciar sesión."
        );
        return;
      }

      // Después de un intento fallido, ahora sí se muestra la recuperación
      setShowForgotPassword(true);

      Alert.alert(
        "No se pudo iniciar sesión",
        "El correo o la contraseña no son correctos."
      );
    } finally {
      setIsLoginLoading(false);
    }
  };

  const onForgotPassword = () => {
    navigation.navigate("LoginRecoverScreen", { email: cleanEmail });
  };

  const onRegister = () => {
    navigation.navigate("LoginRegisterScreen", { email: cleanEmail });
  };

  return (
    <LayoutScreen
      bg="#FFFFFF"
      edges={["top"]}
      padding={{ top: 14, left: 18, right: 18, bottom: 24 }}
    >
      <View style={styles.card}>
        <ModalHeader title="Iniciar sesión" onBack={() => navigation.goBack()} />

        <View style={styles.section}>
          <GoogleButton
            text={isGoogleLoading ? "Entrando..." : "Continuar con Google"}
            onPress={onGoogle}
            loading={isGoogleLoading}
          />

          <Divider text="o" />

          <TextField
            value={email}
            onChangeText={onChangeEmail}
            placeholder="Correo"
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <TextField
            value={password}
            onChangeText={onChangePassword}
            placeholder="Ingresa tu contraseña"
            secureTextEntry
          />

          <PrimaryButton
            label={isLoginLoading ? "Iniciando..." : "Iniciar sesión"}
            onPress={onLogin}
            disabled={!canLogin}
          />

          {showForgotPassword && (
            <TextLink
              text="¿Olvidaste tu contraseña?"
              onPress={onForgotPassword}
            />
          )}
        </View>

        <View style={styles.footer}>
          <TextLink
            text="¿No tienes cuenta? Regístrate"
            onPress={onRegister}
            align="center"
          />
        </View>
      </View>
    </LayoutScreen>
  );
}