import React, { useMemo, useState } from "react";
import { View, Alert } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { LayoutScreen } from "../../../layouts";

import styles from "./styles";
import ModalHeader from "../LoginPasswordScreen/Components/ModalHeader";
import GoogleButton from "./Components/GoogleButton";
import Divider from "../LoginScreen/Components/Divider";
import TextField from "./Components/TextField";
import PrimaryButton from "../LoginScreen/Components/PrimaryButton";
import TermsRow from "./Components/TermsRow";
import TextLink from "../LoginPasswordScreen/Components/TextLink";

export default function LoginRegisterScreen() {
  const navigation = useNavigation();
  const route = useRoute();

  // ✅ Esto permite que 2 screens apunten aquí y opcionalmente manden email
  const prefilledEmail = route.params?.email ?? "";

  const [name, setName] = useState("");
  const [birthDateText, setBirthDateText] = useState(""); // luego lo haremos DatePicker real
  const [email, setEmail] = useState(prefilledEmail);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const canRegister = useMemo(() => {
    if (!name.trim()) return false;
    if (!birthDateText.trim()) return false;
    if (!email.trim()) return false;
    if (!password) return false;
    if (password !== confirmPassword) return false;
    if (!acceptedTerms) return false;
    return true;
  }, [name, birthDateText, email, password, confirmPassword, acceptedTerms]);

  const onGoogle = () => {
    Alert.alert("Google", "Aquí conectamos Google Sign-Up después 👀");
  };

  const onPickBirthDate = () => {
    // ✅ placeholder: luego lo conectamos a un DatePicker y formato bonito
    Alert.alert("Fecha de nacimiento", "Aquí abrimos el selector de fecha (próximo paso).");
  };

  const onRegister = () => {
    if (!canRegister) return;

    Alert.alert(
      "Registro",
      `Nombre: ${name}\nFecha: ${birthDateText}\nEmail: ${email}\nTerms: ${acceptedTerms ? "Sí" : "No"}`
    );

    // Luego aquí: crear usuario en Firebase Auth + guardar perfil en Firestore
  };

  const goToLogin = () => {
    navigation.navigate("LoginPasswordScreen");
  };

  return (
    <LayoutScreen bg="#FFFFFF" edges={["top"]} padding={{ top: 14, left: 18, right: 18, bottom: 24 }}>
      <View style={styles.card}>
        <ModalHeader title="Registrarse" onBack={() => navigation.goBack()} />

        <View style={styles.section}>
          <GoogleButton label="Registrarse con Google" onPress={onGoogle} />

          <Divider text="o" />

          <TextField value={name} onChangeText={setName} placeholder="Nombre" />

          {/* Fecha (por ahora es input tocable) */}
          <TextField
            value={birthDateText}
            onChangeText={setBirthDateText}
            placeholder="Fecha de nacimiento"
            rightHint="📅"
            onPressField={onPickBirthDate}
          />

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
            placeholder="Contraseña"
            secureTextEntry
            helperText="Minimo 8 caracteres, 1 número y 1 letra"
          />

          <TextField
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholder="Confirmar contraseña"
            secureTextEntry
            helperText="La contraseña debe coincidir"
            errorText={
              confirmPassword.length > 0 && password !== confirmPassword
                ? "No coincide"
                : ""
            }
          />

          <TermsRow checked={acceptedTerms} onToggle={() => setAcceptedTerms((v) => !v)} />

          <PrimaryButton label="Registrarse" onPress={onRegister} disabled={!canRegister} />

          <TextLink text="¿Ya tienes cuenta? Inicia sesión" onPress={goToLogin} align="center" />
        </View>
      </View>
    </LayoutScreen>
  );
}
