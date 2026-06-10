import React, { useMemo, useState } from "react";
import { View, Text, TextInput, Pressable, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { LayoutScreen } from "../../../layouts";
import styles from "./styles";

import createDescriptionSubmissionService from "../../../services/api/submissions/descriptions/create/createDescriptionSubmission.service";

const MIN_CHARS = 80;
const MAX_CHARS = 200;

export default function ChangeDescriptionScreen({ route }) {
  const navigation = useNavigation();

  const placeId = route?.params?.placeId ?? "";
  const placeName = route?.params?.placeName ?? "Lugar";
  const currentDescription = route?.params?.currentDescription ?? "";

  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);

  const cleanText = text.trim();
  const chars = text.length;

  const canSend = useMemo(() => {
    return (
      !!placeId &&
      cleanText.length >= MIN_CHARS &&
      cleanText.length <= MAX_CHARS &&
      !sending
    );
  }, [placeId, cleanText.length, sending]);

const handleSend = async () => {
  if (!canSend) return;

  console.log("MANDANDO DESCRIPTION SUBMISSION:", {
    placeId,
    proposedDescription: cleanText,
  });

  try {
    setSending(true);

    await createDescriptionSubmissionService({
      placeId,
      proposedDescription: cleanText,
    });

    Alert.alert(
      "Propuesta enviada",
      "Tu nueva descripción fue enviada para revisión.",
      [
        {
          text: "Aceptar",
          onPress: () => navigation.goBack(),
        },
      ]
    );
  } catch (error) {
    console.log("Error en createDescriptionSubmission:", error?.response?.data || error);

    const message =
      error?.response?.data?.message ||
      error?.message ||
      "No se pudo enviar la propuesta de descripción.";

    Alert.alert("Error", message);
  } finally {
    setSending(false);
  }
};
  return (
    <LayoutScreen
      scroll
      edges={["top"]}
      padding={{ top: 16, left: 16, right: 16, bottom: 18 }}
    >
      <View style={styles.screen}>
        <View style={styles.header}>
          <Pressable
            onPress={() => navigation.goBack()}
            style={styles.closeBtn}
            disabled={sending}
          >
            <Text style={styles.closeText}>×</Text>
          </Pressable>

          <Text style={styles.headerTitle}>Proponer nueva descripción</Text>

          <View style={{ width: 32 }} />
        </View>

        <Text style={styles.subtitle}>
          Ayuda a que este lugar tenga una mejor descripción para los demás.
        </Text>

        <Text style={styles.sectionTitle}>Descripción actual</Text>

        <View style={styles.card}>
          <Text style={styles.cardText}>{currentDescription || "—"}</Text>
        </View>

        <View style={styles.tips}>
          <Text style={styles.tipsTitle}>¿Qué la hace especial?</Text>
          <Text style={styles.tipItem}>• ¿Qué se puede hacer ahí?</Text>
          <Text style={styles.tipItem}>
            • ¿Para qué tipo de plan se recomienda?
          </Text>
          <Text style={styles.tipItem}>• ¿Algún detalle útil?</Text>
        </View>

        <Text style={styles.sectionTitle}>Nueva descripción</Text>

        <View style={styles.inputCard}>
          <TextInput
            value={text}
            onChangeText={setText}
            placeholder={`Escribe sobre ${placeName}...`}
            multiline
            style={styles.input}
            maxLength={MAX_CHARS}
            editable={!sending}
          />
        </View>

        <View style={styles.counterRow}>
          <Text style={styles.counterHint}>
            Escribe al menos {MIN_CHARS} caracteres
          </Text>

          <Text style={styles.counter}>
            {chars}/{MAX_CHARS}
          </Text>
        </View>

        <Pressable
          onPress={handleSend}
          disabled={!canSend}
          style={({ pressed }) => [
            styles.sendBtn,
            !canSend && styles.sendBtnDisabled,
            pressed && canSend && styles.sendBtnPressed,
          ]}
        >
          <Text
            style={[
              styles.sendBtnText,
              !canSend && styles.sendBtnTextDisabled,
            ]}
          >
            {sending ? "Enviando..." : "Enviar"}
          </Text>
        </Pressable>
      </View>
    </LayoutScreen>
  );
}