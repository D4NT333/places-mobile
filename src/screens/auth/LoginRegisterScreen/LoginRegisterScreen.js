import React, { useMemo, useState } from "react";
import { View, Alert, Text } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { LayoutScreen } from "../../../layouts";

import styles from "./styles";
import ModalHeader from "../LoginPasswordScreen/Components/ModalHeader";
import TextField from "./Components/TextField";
import PrimaryButton from "../LoginScreen/Components/PrimaryButton";
import TermsRow from "./Components/TermsRow";
import TextLink from "../LoginPasswordScreen/Components/TextLink";
import BirthDateModal from "./Components/BirthDateModal";
import { icons } from "../../../../assets/icons";

import registerWithEmailService  from "../../../services/firebase/auth/registerWithEmail.service.js";

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
  const [touchedPassword, setTouchedPassword] = useState(false);
  const [touchedConfirm, setTouchedConfirm] = useState(false);

  const [birthDateIso, setBirthDateIso] = useState("");
const [isBirthDateModalVisible, setIsBirthDateModalVisible] = useState(false);

const [showPassword, setShowPassword] = useState(false);
const [showConfirmPassword, setShowConfirmPassword] = useState(false);

const [touchedName, setTouchedName] = useState(false);
const [touchedEmail, setTouchedEmail] = useState(false);
const [birthDateError, setBirthDateError] = useState("");

const [isRegistering, setIsRegistering] = useState(false);

const cleanName = useMemo(() => name.trim(), [name]);
const cleanEmail = useMemo(() => email.trim().toLowerCase(), [email]);

const isNameValid = useMemo(() => {
  return cleanName.length >= 3;
}, [cleanName]);

const isEmailValid = useMemo(() => {
  const emailRegex =
    /^[^\s@]{3,}@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z]{2,}$/;

  return emailRegex.test(cleanEmail);
}, [cleanEmail]);

const isPasswordValid = useMemo(() => {
  /**
   * Mínimo:
   * - 8 caracteres
   * - 1 letra
   * - 1 número
   * - 1 caracter especial
   */
  const passwordRegex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

  return passwordRegex.test(password);
}, [password]);

const isBirthDateValid = useMemo(() => {
  if (!birthDateIso) return false;

  const birthDate = new Date(`${birthDateIso}T00:00:00`);
  const today = new Date();

  let age = today.getFullYear() - birthDate.getFullYear();

  const hasHadBirthdayThisYear =
    today.getMonth() > birthDate.getMonth() ||
    (today.getMonth() === birthDate.getMonth() &&
      today.getDate() >= birthDate.getDate());

  if (!hasHadBirthdayThisYear) {
    age -= 1;
  }

  return age >= 14;
}, [birthDateIso]);

const nameError = useMemo(() => {
  if (!touchedName) return "";
  if (!cleanName) return "";
  if (!isNameValid) return "Mínimo 3 letras";
  return "";
}, [touchedName, cleanName, isNameValid]);

const emailError = useMemo(() => {
  if (!touchedEmail) return "";
  if (!cleanEmail) return "";
  if (!isEmailValid) return "Ingresa un correo válido";
  return "";
}, [touchedEmail, cleanEmail, isEmailValid]);

const passwordError = useMemo(() => {
  if (!touchedPassword) return "";
  if (!password) return "";
  if (!isPasswordValid) {
    return "Mínimo 8 caracteres, 1 letra, 1 número y 1 símbolo";
  }
  return "";
}, [touchedPassword, password, isPasswordValid]);

const confirmPasswordError = useMemo(() => {
  if (!touchedConfirm) return "";
  if (!confirmPassword) return "";
  if (password !== confirmPassword) return "No coincide";
  return "";
}, [password, confirmPassword, touchedConfirm]);

 const canRegister = useMemo(() => {
  if (isRegistering) return false;
  if (!isNameValid) return false;
  if (!isEmailValid) return false;
  if (!isPasswordValid) return false;
  if (password !== confirmPassword) return false;
  if (!isBirthDateValid) return false;
  if (!acceptedTerms) return false;

  return true;
}, [
  isRegistering,
  isNameValid,
  isEmailValid,
  isPasswordValid,
  password,
  confirmPassword,
  isBirthDateValid,
  acceptedTerms,
]);

  const onPickBirthDate = () => {
  setIsBirthDateModalVisible(true);
};

  const onConfirmBirthDate = ({ isoValue, displayValue }) => {
  setBirthDateIso(isoValue);
  setBirthDateText(displayValue);
  setIsBirthDateModalVisible(false);

  const birthDate = new Date(`${isoValue}T00:00:00`);
  const today = new Date();

  let age = today.getFullYear() - birthDate.getFullYear();

  const hasHadBirthdayThisYear =
    today.getMonth() > birthDate.getMonth() ||
    (today.getMonth() === birthDate.getMonth() &&
      today.getDate() >= birthDate.getDate());

  if (!hasHadBirthdayThisYear) {
    age -= 1;
  }

  if (age < 14) {
    setBirthDateError("Debes tener al menos 14 años para crear una cuenta");
    return;
  }

  setBirthDateError("");
};

  const onRegister = async () => {
  if (!canRegister) return;

  try {
    setIsRegistering(true);

    await registerWithEmailService({
      name: cleanName,
      email: cleanEmail,
      password,
      birthDate: birthDateIso,
    });

    Alert.alert(
  "Verifica tu correo",
  "Te enviamos un correo de verificación. Revisa tu bandeja antes de iniciar sesión.",
  [
    {
      text: "OK",
      onPress: () => {
        navigation.navigate("LoginPasswordScreen", {
          email: cleanEmail,
        });
      },
    },
  ]
);
  } catch (error) {
    console.log("Error al registrar usuario:", error);

    if (error?.code === "auth/email-already-in-use") {
      Alert.alert(
        "Correo en uso",
        "Este correo ya está registrado. Intenta iniciar sesión."
      );
      return;
    }

    if (error?.code === "auth/invalid-email") {
      Alert.alert(
        "Correo inválido",
        "Revisa tu correo e inténtalo de nuevo."
      );
      return;
    }

    if (error?.code === "auth/weak-password") {
      Alert.alert(
        "Contraseña débil",
        "Usa una contraseña más segura."
      );
      return;
    }

    Alert.alert(
      "Error",
      "No se pudo crear la cuenta. Inténtalo de nuevo."
    );
  } finally {
    setIsRegistering(false);
  }
};

  const goToLogin = () => {
    navigation.navigate("LoginPasswordScreen");
  };

  return (
    <LayoutScreen bg="#FFFFFF" edges={["top"]} padding={{ top: 14, left: 18, right: 18, bottom: 24 }}>
      <View style={styles.card}>
        <ModalHeader title="Registrarse" onBack={() => navigation.goBack()} />

        <View style={styles.section}>
         <View style={styles.registerIntro}>
            <Text style={styles.registerIntroTitle}>
              Crea tu cuenta en Lsearch
            </Text>

            <Text style={styles.registerIntroText}>
              Guarda tus lugares favoritos, descubre nuevas recomendaciones y personaliza tu experiencia.
            </Text>
          </View>

          <TextField
            value={name}
            onChangeText={(value) => {
              setName(value);
            }}
            onBlur={() => setTouchedName(true)}
            placeholder="Nombre"
            errorText={nameError}
          />

          {/* Fecha (por ahora es input tocable) */}

         <TextField
            value={email}
            onChangeText={(value) => {
              setEmail(value);
            }}
            onBlur={() => setTouchedEmail(true)}
            placeholder="Correo"
            keyboardType="email-address"
            autoCapitalize="none"
            errorText={emailError}
          />

          <TextField
            value={password}
            onChangeText={setPassword}
            onBlur={() => setTouchedPassword(true)}
            placeholder="Contraseña"
            secureTextEntry={!showPassword}
            helperText={
              touchedPassword
                ? "Mínimo 8 letras, 1 número y 1 caracter especial"
                : ""
            }
            rightIconSource={showPassword ? icons.openeye : icons.closedeye}
            onPressRightIcon={() => setShowPassword((value) => !value)}
          />

 <TextField
  value={confirmPassword}
  onChangeText={(value) => {
    setConfirmPassword(value);
  }}
  onBlur={() => setTouchedConfirm(true)}
  placeholder="Confirmar contraseña"
  secureTextEntry={!showConfirmPassword}
  errorText={confirmPasswordError}
  rightIconSource={showConfirmPassword ? icons.openeye : icons.closedeye}
  onPressRightIcon={() => setShowConfirmPassword((value) => !value)}
/>
          <TextField
  value={birthDateText}
  onChangeText={setBirthDateText}
  placeholder="Fecha de nacimiento"
  onPressField={onPickBirthDate}
  errorText={birthDateError}
/>

          <TermsRow checked={acceptedTerms} onToggle={() => setAcceptedTerms((v) => !v)} />

          <PrimaryButton
  label={isRegistering ? "Creando cuenta..." : "Registrarse"}
  onPress={onRegister}
  disabled={!canRegister}
/>

          <TextLink text="¿Ya tienes cuenta? Inicia sesión" onPress={goToLogin} align="center" />
        </View>
      </View>

      <BirthDateModal
        visible={isBirthDateModalVisible}
        initialValue={birthDateIso}
        onClose={() => setIsBirthDateModalVisible(false)}
        onConfirm={onConfirmBirthDate}
      />
    </LayoutScreen>
  );
}
