import React from "react";
import { Pressable, Text, View } from "react-native";
import styles from "./styles";

export default function TermsRow({ checked, onToggle }) {
  return (
    <Pressable onPress={onToggle} style={({ pressed }) => [styles.row, pressed && styles.pressed]}>
      <View style={[styles.box, checked && styles.boxChecked]}>
        {checked ? <Text style={styles.check}>✓</Text> : null}
      </View>

      <Text style={styles.text}>
        He leído y acepto los{" "}
        <Text style={styles.link}>términos y condiciones</Text> y el{" "}
        <Text style={styles.link}>aviso de privacidad</Text>
      </Text>
    </Pressable>
  );
}
