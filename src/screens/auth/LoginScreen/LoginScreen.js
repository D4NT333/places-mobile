import React, { useMemo, useState } from "react";
import { View, Text, KeyboardAvoidingView, Platform, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LayoutScreen } from "../../../layouts";

import googleSignInService from "../../../services/auth/googleSignIn.service";

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
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const isEmailValid = useMemo(() => {
    const v = email.trim();
    // validación simple (suficiente por ahora)
    return v.length > 5 && v.includes("@") && v.includes(".");
  }, [email]);

  const handleContinue = () => {
    if (!isEmailValid) {
      Alert.alert("Correo inválido", "Revisa tu correo e inténtalo de nuevo.");
      return;
    }

    // ✅ CAMBIA ESTE ROUTE cuando me digas a cuál screen va
    navigation.navigate("LoginPasswordScreen", { email: email.trim() });
  };

    const handleGoogle = async () => {
      if (isGoogleLoading) return;

      try {
        setIsGoogleLoading(true);

        const { firebaseUser } = await googleSignInService();

        console.log("firebaseUser:", firebaseUser);

        Alert.alert(
          "Bienvenido",
          firebaseUser?.displayName || firebaseUser?.email || "Usuario"
        );
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
    <LayoutScreen bg="#FFFFFF" edges={["top"]} padding={{ top: 18, left: 18, right: 18, bottom: 24 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <View style={styles.card}>
          <AuthHeader
            subtitle="Explora, guarda y descubre nuevos lugares"
          />

          <View style={styles.form}>
            <EmailField value={email} onChangeText={setEmail} placeholder="Correo" />

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
