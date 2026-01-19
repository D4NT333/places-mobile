import React from "react";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { LayoutScreen } from "../../../../layouts"; // ajusta si cambia
import styles from "./styles";

// Reusar header existente
import Header from "../ChangePasswordScreen/Components/Header";

// Reusar la card scrolleable (la misma que usas en Términos)
import TermsCard from "../TermsConditionsScreen/Components/TermsCard";

import { privacySections } from "./Components/PrivacyText";

export default function PrivacyNoticeScreen() {
  const navigation = useNavigation();

  return (
    <LayoutScreen
      edges={["top"]}
      padding={{ top: 16, left: 16, right: 16, bottom: 24 }}
      bg="#FFFFFF"
    >
      <Header title="Aviso de privacidad" onBack={() => navigation.goBack()} />

      <View style={styles.body}>
        <TermsCard sections={privacySections} />
      </View>
    </LayoutScreen>
  );
}
