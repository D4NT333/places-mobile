import React, { useMemo, useState } from "react";
import { View, Alert } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { LayoutScreen } from "../../../layouts";

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

  const canLogin = useMemo(() => {
    return email.trim().length > 0 && password.length >= 1;
  }, [email, password]);

  const onGoogle = () => {
    Alert.alert("Google", "Aquí conectamos Google Auth después 👀");
  };

  const onLogin = () => {
    if (!canLogin) return;

    // 🔥 Aquí luego conectamos Firebase signInWithEmailAndPassword
    Alert.alert("Login", `Email: ${email}\nPass: ${"*".repeat(password.length)}`);
  };

  const onForgotPassword = () => {
    navigation.navigate("LoginRecoverScreen", { email });
  };

  const onRegister = () => {
    navigation.navigate("LoginRegisterScreen");
  };

  return (
    <LayoutScreen bg="#FFFFFF" edges={["top"]} padding={{ top: 14, left: 18, right: 18, bottom: 24 }}>
      <View style={styles.card}>
        <ModalHeader title="Iniciar sesion" onBack={() => navigation.goBack()} />

        <View style={styles.section}>
          <GoogleButton
            text="Continuar con Google"
            onPress={onGoogle}
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

          <PrimaryButton label="Iniciar sesion" onPress={onLogin} disabled={!canLogin} />

          <TextLink text="¿Olvidaste tu contraseña?" onPress={onForgotPassword} />
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
