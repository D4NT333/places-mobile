import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  Pressable,
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import { LayoutScreen } from "../../../../layouts";
import { icons } from "../../../../../assets/icons";

import styles from "./styles";

import ProblemTypeChips from "./Components/ProblemTypeChips";
import ProblemMessageBox from "./Components/ProblemMessageBox";
import SubmitButton from "./Components/SubmitButton";

const REPORT_TARGETS = [
  { id: "general", label: "General" },
  { id: "place", label: "Lugar" },
  { id: "user", label: "Usuario" },
];

const REPORT_REASONS = {
  general: [
    { id: "error", label: "Error" },
    { id: "performance", label: "Rendimiento" },
    { id: "visual_problem", label: "Problema visual" },
  ],
  place: [
    { id: "wrong_info", label: "Información incorrecta" },
    { id: "wrong_location", label: "Ubicación incorrecta" },
    { id: "wrong_photos", label: "Fotos incorrectas" },
  ],
  user: [
    { id: "spam", label: "Spam" },
    { id: "offensive_content", label: "Contenido ofensivo" },
    { id: "suspicious_activity", label: "Actividad sospechosa" },
  ],
};

export default function ReportProblemScreen() {
  const navigation = useNavigation();

  const MIN_CHARS = 20;
  const MAX_CHARS = 500;

  const [reportTarget, setReportTarget] = useState("general");
  const [reasonId, setReasonId] = useState(REPORT_REASONS.general[0].id);
  const [message, setMessage] = useState("");

  const currentReasons = useMemo(() => {
    return REPORT_REASONS[reportTarget] || [];
  }, [reportTarget]);

  const messageLength = message.trim().length;
  const canSubmit = messageLength >= MIN_CHARS;

  const handleTargetChange = (targetId) => {
    setReportTarget(targetId);

    const firstReason = REPORT_REASONS[targetId]?.[0]?.id;
    if (firstReason) {
      setReasonId(firstReason);
    }
  };

  const onSubmit = async () => {
    const cleanMessage = message.trim();

    if (cleanMessage.length < MIN_CHARS) {
      Alert.alert(
        "Falta información",
        `Describe el problema con al menos ${MIN_CHARS} caracteres.`
      );
      return;
    }

    const payload = {
      reportTarget,
      reasonId,
      message: cleanMessage,
      status: "pending",
      createdAt: Date.now(),
    };

    console.log("Reporte enviado:", payload);

    // Luego conectamos esto con backend / Firestore:
    // await createReport(payload);

    Alert.alert("Gracias", "Tu reporte fue enviado para revisión.");
    navigation.goBack();
  };

  return (
  <KeyboardAvoidingView
    style={styles.keyboardView}
    behavior={Platform.OS === "ios" ? "padding" : "height"}
    keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
  >
    <LayoutScreen
      scroll
      edges={["top"]}
      padding={{ top: 14, left: 20, right: 20, bottom: 34 }}
      bg="#FFFFFF"
    >
      <View style={styles.header}>
        <Pressable
          onPress={() => navigation.goBack()}
          style={styles.backButton}
          hitSlop={12}
        >
          <Image source={icons.flecha} style={styles.backIcon} />
        </Pressable>

        <Text style={styles.headerTitle}>Reportar un problema</Text>

        <View style={styles.headerSpacer} />
      </View>

      <View style={styles.content}>
        <Text style={styles.subtitle}>
          Selecciona qué tipo de reporte quieres enviar.
        </Text>

        <Text style={styles.sectionTitle}>¿Qué quieres reportar?</Text>

        <ProblemTypeChips
          options={REPORT_TARGETS}
          value={reportTarget}
          onChange={handleTargetChange}
          size="small"
        />

        <Text style={[styles.sectionTitle, styles.reasonTitle]}>
          Selecciona el motivo
        </Text>

        <ProblemTypeChips
          options={currentReasons}
          value={reasonId}
          onChange={setReasonId}
          size="medium"
        />

        <Text style={[styles.sectionTitle, styles.messageTitle]}>
          Cuéntanos qué ocurrió:
        </Text>

        <ProblemMessageBox
          value={message}
          onChange={setMessage}
          minChars={MIN_CHARS}
          maxChars={MAX_CHARS}
          placeholder="Describe brevemente qué ocurrió..."
        />

        <SubmitButton title="Enviar" onPress={onSubmit} disabled={!canSubmit} />

        <View style={styles.keyboardBottomSpace} />
      </View>
    </LayoutScreen>
  </KeyboardAvoidingView>
);
}