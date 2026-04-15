import React from "react";
import { Pressable, Text, View } from "react-native";
import styles from "./styles";

export default function LikertAnswersSummary({
  questionOneLabel,
  questionTwoLabel,
  onEditQuestionOne,
  onEditQuestionTwo,
}) {
  return (
    <View style={styles.container}>
      <Pressable
        onPress={onEditQuestionOne}
        style={styles.row}
        accessibilityRole="button"
        accessibilityLabel={`Pregunta 1 ${questionOneLabel}`}
        accessibilityHint="Toca para editar la respuesta de la pregunta 1"
      >
        <Text style={styles.text}>{`Pregunta 1 ${questionOneLabel}`}</Text>
      </Pressable>

      <Pressable
        onPress={onEditQuestionTwo}
        style={styles.row}
        accessibilityRole="button"
        accessibilityLabel={`Pregunta 2 ${questionTwoLabel}`}
        accessibilityHint="Toca para editar la respuesta de la pregunta 2"
      >
        <Text style={styles.text}>{`Pregunta 2 ${questionTwoLabel}`}</Text>
      </Pressable>
    </View>
  );
}