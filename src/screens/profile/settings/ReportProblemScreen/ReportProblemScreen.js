import React, { useMemo, useState } from "react";
import { View, Text, Pressable, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LayoutScreen } from "../../../../layouts";

import styles from "./styles";
import ProblemTypeChips from "./Components/ProblemTypeChips";
import ProblemMessageBox from "./Components/ProblemMessageBox";
import SubmitButton from "./Components/SubmitButton";

export default function ReportProblemScreen() {
  const navigation = useNavigation();

  const TYPES = useMemo(
    () => [
      { id: "performance", label: "Rendimiento" },
      { id: "error", label: "Error" },
      { id: "wrong_info", label: "Información\nincorrecta" },
    ],
    []
  );

  const [typeId, setTypeId] = useState("performance");
  const [message, setMessage] = useState("");

  const MIN_CHARS = 20;
  const MAX_CHARS = 500;

  const canSubmit = message.trim().length >= MIN_CHARS;

  const onSubmit = async () => {
    if (!canSubmit) {
      Alert.alert("Falta info", `Escribe al menos ${MIN_CHARS} caracteres.`);
      return;
    }

    // Aquí luego conectas a tu backend / firestore:
    // await reportProblem({ typeId, message: message.trim(), createdAt: Date.now() })

    Alert.alert("Gracias", "Tu reporte fue enviado.");
    navigation.goBack();
  };

  return (
    <LayoutScreen
      scroll
      edges={["top"]}
      padding={{ top: 16, left: 16, right: 16, bottom: 24 }}
      bg="#FFFFFF"
    >
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} style={styles.backBtn} hitSlop={10}>
          <Text style={styles.backIcon}>←</Text>
        </Pressable>

        <Text style={styles.headerTitle}>Reportar un problema</Text>
        <View style={{ width: 36 }} />
      </View>

      <Text style={styles.title}>Cuéntanos tu problema:</Text>

      <Text style={styles.sectionLabel}>Tipo de problema:</Text>
      <ProblemTypeChips options={TYPES} value={typeId} onChange={setTypeId} />

      <ProblemMessageBox
        value={message}
        onChange={setMessage}
        minChars={MIN_CHARS}
        maxChars={MAX_CHARS}
      />

      <View style={{ height: 14 }} />

      <SubmitButton title="Enviar" onPress={onSubmit} disabled={!canSubmit} />
    </LayoutScreen>
  );
}
