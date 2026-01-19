import React from "react";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { LayoutScreen } from "../../../../layouts"; // ajusta si cambia
import styles from "./styles";

// Reusar header existente
import Header from "../ChangePasswordScreen/Components/Header";

import  TermsCard  from "./Components/TermsCard";
import {terms}  from "./Components/terms";

export default function TermsConditionsScreen() {
  const navigation = useNavigation();

  return (
    <LayoutScreen
      edges={["top"]}
      padding={{ top: 16, left: 16, right: 16, bottom: 24 }}
      bg="#FFFFFF"
    >
      <Header title="Términos y condiciones" onBack={() => navigation.goBack()} />

      <View style={styles.body}>
        <TermsCard sections={terms} />
      </View>
    </LayoutScreen>
  );
}
