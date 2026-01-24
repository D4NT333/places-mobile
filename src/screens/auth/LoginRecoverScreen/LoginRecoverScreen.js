import React, { useMemo, useState } from "react";
import { View, Text, Alert } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { LayoutScreen } from "../../../layouts";

import styles from "./styles";
import ModalHeaderClose from "./Components/ModalHeader";
import TextField from "../LoginPasswordScreen/Components/TextField";
import PrimaryButton from "../LoginScreen/Components/PrimaryButton";


export default function LoginRecoverScreen() {
  const navigation = useNavigation();
  const route = useRoute();

  const prefilledEmail = route.params?.email ?? "";
  const [email, setEmail] = useState(prefilledEmail);

  const canSend = useMemo(() => email.trim().length > 0, [email]);

  const onSendLink = async () => {
    if (!canSend) return;

    try {
      const e = email.trim();

      Alert.alert("Enlace enviado", `Si el correo existe, llegará a: ${e}`);
      navigation.goBack();

      // Cuando conectes Firebase:
      // await sendPasswordResetEmail(auth, e);
      // Alert.alert("Enlace enviado", "Revisa tu correo para restablecer tu contraseña.");
      // navigation.goBack();
    } catch (err) {
      Alert.alert("Error", "No se pudo enviar el enlace. Intenta más tarde.");
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

          <PrimaryButton label="Enviar enlace" onPress={onSendLink} disabled={!canSend} />
        </View>
      </View>
    </LayoutScreen>
  );
}
