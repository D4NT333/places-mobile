import React, { useState } from "react";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { LayoutScreen } from "../../../../layouts"; // ajusta ruta si tu LayoutScreen vive en otro lado
import styles from "./styles";

import Header from "./Components/Header";
import PasswordInput from "./Components/PasswordInput";
import PrimaryButton from "./Components/PrimaryButton"; 

export default function ChangePasswordScreen() {
  const navigation = useNavigation();

  // Solo maqueta por ahora
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  return (
    <LayoutScreen
      scroll
      edges={["top"]}
      padding={{ top: 16, left: 16, right: 16, bottom: 24 }}
      bg="#FFFFFF"
    >
      <Header title="Cambiar contraseña" onBack={() => navigation.goBack()} />

      <View style={styles.form}>
        <PasswordInput
          label="Contraseña actual:"
          value={currentPassword}
          onChangeText={setCurrentPassword}
          placeholder=""
        />

        <PasswordInput
          label="Nueva contraseña:"
          value={newPassword}
          onChangeText={setNewPassword}
          placeholder=""
        />

        <PasswordInput
          label="Confirmar nueva contraseña:"
          value={confirmNewPassword}
          onChangeText={setConfirmNewPassword}
          placeholder=""
        />
      </View>

      <View style={styles.footer}>
        <PrimaryButton title="Confirmar cambio" onPress={() => {}} />
      </View>
    </LayoutScreen>
  );
}
