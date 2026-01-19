import React, { useMemo, useState } from "react";
import { View, Text, Pressable, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LayoutScreen } from "../../../../layouts";

import styles from "./styles";

// Reusa los componentes de ReportProblem (ajusta la ruta según tu proyecto)
import ProblemTypeChips from "../ReportProblemScreen/Components/ProblemTypeChips";
import ProblemMessageBox from "../ReportProblemScreen/Components/ProblemMessageBox";
import SubmitButton from "../ReportProblemScreen/Components/SubmitButton";

import SuccessToast from "./Components/SuccessToast";

export default function SuggestImprovementScreen() {
  const navigation = useNavigation();

  const TYPES = useMemo(
    () => [
      { id: "new_feature", label: "Nueva función" },
      { id: "design", label: "Diseño" },
      { id: "notifications", label: "Notificaciones" },
      { id: "recommendations", label: "Recomendaciones" },
      { id: "idk", label: "No se xd" },
    ],
    []
  );

  const [typeId, setTypeId] = useState("new_feature");
  const [message, setMessage] = useState("");
  const [showThanks, setShowThanks] = useState(false);

  const MIN_CHARS = 20;
  const MAX_CHARS = 500;

  const canSubmit = message.trim().length >= MIN_CHARS;

  const onSubmit = async () => {
    if (!canSubmit) {
      Alert.alert("Falta info", `Escribe al menos ${MIN_CHARS} caracteres.`);
      return;
    }

    // Aquí luego conectas a tu backend / firestore:
    // await submitSuggestion({ typeId, message: message.trim(), createdAt: Date.now() })

    setShowThanks(true);

    // 1.5s y vuelve atrás
    setTimeout(() => {
      setShowThanks(false);
      navigation.goBack();
    }, 1500);
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

        <Text style={styles.headerTitle}>Sugerir mejora</Text>
        <View style={{ width: 36 }} />
      </View>

      <Text style={styles.question}>¿Qué te gustaría mejorar o agregar en Lsearch?</Text>

      <Text style={styles.sectionLabel}>Tipo de mejora:</Text>
      <ProblemTypeChips options={TYPES} value={typeId} onChange={setTypeId} />

      <ProblemMessageBox
        value={message}
        onChange={setMessage}
        minChars={MIN_CHARS}
        maxChars={MAX_CHARS}
      />

      <View style={{ height: 14 }} />

      <SubmitButton title="Enviar" onPress={onSubmit} disabled={!canSubmit} />

      {/* Toast de gracias */}
      <SuccessToast visible={showThanks} />
    </LayoutScreen>
  );
}
