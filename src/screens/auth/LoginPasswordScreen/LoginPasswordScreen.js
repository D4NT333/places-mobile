import React, { useMemo, useState } from "react";
import { View, Alert } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

import { LayoutScreen } from "../../../layouts";

import {
  googleSignInService,
  syncSessionWithBackendService,
} from "../../../services";

import loginWithEmailService from "../../../services/firebase/auth/loginWithEmail.service";

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

  const cleanEmail = useMemo(() => {
    return email.trim().toLowerCase();
  }, [email]);

  const canLogin = useMemo(() => {
    return cleanEmail.length > 0 && password.length >= 1 && !isLoginLoading;
  }, [cleanEmail, password, isLoginLoading]);

  const onGoogle = async () => {
    if (isGoogleLoading) return;

    try {
      setIsGoogleLoading(true);

      const { firebaseUser } = await googleSignInService();

      const idToken = await firebaseUser.getIdToken(true);

      const sessionData = await syncSessionWithBackendService({ idToken });

      console.log("firebaseUser Google:", firebaseUser);
      console.log("sessionData Google:", sessionData);

      /**
       * No navegamos manualmente.
       * App.js detecta auth.currentUser y RootNavigator cambia a MainPager.
       */
    } catch (error) {
      console.log("Error login Google:", error);

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

      const { firebaseUser, sessionData } = await loginWithEmailService({
        email: cleanEmail,
        password,
      });

      console.log("firebaseUser Email:", firebaseUser);
      console.log("sessionData Email:", sessionData);

      /**
       * No navigation.reset aquí.
       * onAuthStateChanged en App.js se encarga.
       */
    } catch (error) {
      console.log("Error login correo/contraseña:", error);

      if (error?.code === "auth/email-not-verified") {
        Alert.alert(
          "Correo no verificado",
          "Revisa tu correo y confirma tu cuenta antes de iniciar sesión."
        );
        return;
      }

      Alert.alert(
        "No se pudo iniciar sesión",
        "El correo o la contraseña no son correctos. Si creaste tu cuenta con Google, inicia sesión con Google."
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
        <ModalHeader title="Iniciar sesion" onBack={() => navigation.goBack()} />

        <View style={styles.section}>
          <GoogleButton
            text={isGoogleLoading ? "Entrando..." : "Continuar con Google"}
            onPress={onGoogle}
            loading={isGoogleLoading}
          />

          <Divider text="o" />

          <TextField
            value={email}
            onChangeText={setEmail}
            placeholder="Correo"
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <TextField
            value={password}
            onChangeText={setPassword}
            placeholder="Ingresa tu contrasena"
            secureTextEntry
          />

          <PrimaryButton
            label={isLoginLoading ? "Iniciando..." : "Iniciar sesion"}
            onPress={onLogin}
            disabled={!canLogin}
          />

          <TextLink
            text="¿Olvidaste tu contraseña?"
            onPress={onForgotPassword}
          />
        </View>

        <View style={styles.footer}>
          <TextLink
            text="¿No tienes cuenta?  Regístrate"
            onPress={onRegister}
            align="center"
          />
        </View>
      </View>
    </LayoutScreen>
  );
}