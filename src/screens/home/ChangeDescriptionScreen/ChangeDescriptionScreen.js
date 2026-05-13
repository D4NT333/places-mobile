import React, { useMemo, useState } from "react";
import { View, Text, TextInput, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { LayoutScreen } from "../../../layouts";
import styles from "./styles";

const MIN_CHARS = 80;
const MAX_CHARS = 200;

export default function ChangeDescriptionScreen({ route }) {
  const navigation = useNavigation();

  const placeId = route?.params?.placeId ?? "place_1";
  const placeName = route?.params?.placeName ?? "Lugar";
  const currentDescription = route?.params?.currentDescription ?? "";

  const [text, setText] = useState("");

  const chars = text.length;

  const canSend = useMemo(() => {
    return chars >= MIN_CHARS && chars <= MAX_CHARS;
  }, [chars]);

  const handleSend = () => {
    // TODO: aquí luego llamas a tu back / firestore:
    // enviar propuesta: { placeId, text, createdAt, userId }
    console.log("SEND NEW DESCRIPTION", { placeId, text });

    // por ahora solo regresamos
    navigation.goBack();
  };

  return (
    <LayoutScreen scroll edges={["top"]} padding={{ top: 16, left: 16, right: 16, bottom: 18 }}>
      <View style={styles.screen}>
        {/* Header simple */}
        <View style={styles.header}>
          <Pressable onPress={() => navigation.goBack()} style={styles.closeBtn}>
            <Text style={styles.closeText}>×</Text>
          </Pressable>
          <Text style={styles.headerTitle}>Proponer nueva descripción</Text>
          <View style={{ width: 32 }} />
        </View>

        <Text style={styles.subtitle}>
          Ayuda a que este lugar tenga una mejor descripción para los demás.
        </Text>

        {/* Descripción actual */}
        <Text style={styles.sectionTitle}>Descripción actual</Text>
        <View style={styles.card}>
          <Text style={styles.cardText}>{currentDescription || "—"}</Text>
        </View>

        {/* Tips */}
        <View style={styles.tips}>
          <Text style={styles.tipsTitle}>¿Qué la hace especial?</Text>
          <Text style={styles.tipItem}>• ¿Qué se puede hacer ahí?</Text>
          <Text style={styles.tipItem}>• ¿Para qué tipo de plan se recomienda?</Text>
          <Text style={styles.tipItem}>• ¿Algún detalle útil?</Text>
        </View>

        {/* Nueva descripción */}
        <Text style={styles.sectionTitle}>Nueva descripción</Text>
        <View style={styles.inputCard}>
          <TextInput
            value={text}
            onChangeText={setText}
            placeholder={`Escribe sobre ${placeName}...`}
            multiline
            style={styles.input}
            maxLength={MAX_CHARS}
          />
        </View>

        <View style={styles.counterRow}>
          <Text style={styles.counterHint}>Escribe al menos {MIN_CHARS} caracteres</Text>
          <Text style={styles.counter}>{chars}/{MAX_CHARS}</Text>
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
          <Text style={[styles.sendBtnText, !canSend && styles.sendBtnTextDisabled]}>
            Enviar
          </Text>
        </Pressable>
      </View>
    </LayoutScreen>
  );
}
