import React, { useMemo, useState } from "react";
import { View, Text, KeyboardAvoidingView, Platform, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LayoutScreen } from "../../../layouts";

import {
  googleSignInService,
  syncSessionWithBackendService,
} from "../../../services";

import styles from "./styles";
import AuthHeader from "./Components/AuthHeader";
import EmailField from "./Components/EmailField";
import PrimaryButton from "./Components/PrimaryButton";
import Divider from "./Components/Divider";
import GoogleButton from "./Components/GoogleButton";
import AuthFooterLink from "./Components/AuthFooterLink";

export default function LoginScreen() {
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const cleanEmail = useMemo(() => email.trim().toLowerCase(), [email]);

  const isEmailValid = useMemo(() => {
    /**
     * Valida:
     * - mínimo 3 caracteres antes del @
     * - dominio después del @
     * - extensión final mínimo 2 caracteres: .com, .mx, .net, etc.
     * - sin espacios
     */
    const emailRegex =
      /^[^\s@]{3,}@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z]{2,}$/;

    return emailRegex.test(cleanEmail);
  }, [cleanEmail]);

  const handleEmailChange = (value) => {
    setEmail(value);

    if (emailError) {
      setEmailError("");
    }
  };

  const handleContinue = () => {
    if (!isEmailValid) {
      setEmailError("Ingresa un correo válido.");
      return;
    }

    setEmailError("");
    navigation.navigate("LoginPasswordScreen", { email: cleanEmail });
  };

  const handleGoogle = async () => {
    if (isGoogleLoading) return;

    try {
      setIsGoogleLoading(true);

      const { firebaseUser } = await googleSignInService();

      const idToken = await firebaseUser.getIdToken();

      const sessionData = await syncSessionWithBackendService({ idToken });

      console.log("firebaseUser:", firebaseUser);
      console.log("sessionData:", sessionData);

      Alert.alert(
        "Bienvenido",
        firebaseUser?.displayName || firebaseUser?.email || "Usuario"
      );

      // Cuando tengas definida la pantalla principal:
      // navigation.reset({
      //   index: 0,
      //   routes: [{ name: "HomeScreen" }],
      // });
    } catch (error) {
      Alert.alert(
        "Error",
        error?.message || "No se pudo iniciar sesión con Google."
      );
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const goToRegister = () => {
    navigation.navigate("LoginRegisterScreen");
  };

  return (
    <LayoutScreen
      bg="#FFFFFF"
      edges={["top"]}
      padding={{ top: 18, left: 18, right: 18, bottom: 24 }}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <View style={styles.card}>
          <AuthHeader subtitle="Explora, guarda y descubre nuevos lugares" />

          <View style={styles.form}>
            <EmailField
              value={email}
              onChangeText={handleEmailChange}
              placeholder="Correo"
            />

            {!!emailError && (
              <Text style={styles.errorText}>{emailError}</Text>
            )}

            <PrimaryButton
              label="Continuar"
              onPress={handleContinue}
              disabled={!isEmailValid}
            />

            <Divider text="o continuar con" />

            <GoogleButton
              text="Continuar con Google"
              onPress={handleGoogle}
              loading={isGoogleLoading}
            />
          </View>

          <AuthFooterLink
            text="¿No tienes cuenta?"
            linkText="Regístrate"
            onPress={goToRegister}
          />
        </View>

        <Text style={styles.hint}>
          {/* opcional: notas internas */}
        </Text>
      </KeyboardAvoidingView>
    </LayoutScreen>
  );
}