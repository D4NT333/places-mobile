import React, { useState } from "react";
import { View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { LayoutScreen } from "../../../../layouts"; 
import styles from "./styles";

// Reutiliza del ChangePasswordScreen
import Header from "../ChangePasswordScreen/Components/Header";
import PrimaryButton from "../ChangePasswordScreen/Components/PrimaryButton";

// Local de esta screen
import  EmailInput  from "./Components/EmailInput";

export default function ChangeEmailScreen() {
  const navigation = useNavigation();

  // solo maqueta por ahora
  const [currentEmail, setCurrentEmail] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");

  return (
    <LayoutScreen
      scroll
      edges={["top"]}
      padding={{ top: 16, left: 16, right: 16, bottom: 24 }}
      bg="#FFFFFF"
    >
      <Header title="Cambiar correo" onBack={() => navigation.goBack()} />

      <View style={styles.form}>
        <EmailInput
          label="Correo actual:"
          value={currentEmail}
          onChangeText={setCurrentEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <EmailInput
          label="Correo nuevo:"
          value={newEmail}
          onChangeText={setNewEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <EmailInput
          label="Contraseña actual:"
          value={currentPassword}
          onChangeText={setCurrentPassword}
          secureTextEntry
          autoCapitalize="none"
        />

        <Text style={styles.helperText}>
          Te enviaremos un correo de verificación para confirmar el cambio.
        </Text>
      </View>

      <View style={styles.footer}>
        <PrimaryButton title="Confirmar cambio" onPress={() => {}} />
      </View>
    </LayoutScreen>
  );
}
