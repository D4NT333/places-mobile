import React, { useState } from "react";
import { View, Text, TextInput, Pressable } from "react-native";
import styles from "./styles";

export default function PasswordInput({
  label,
  value,
  onChangeText,
  placeholder = "",
}) {
  const [secure, setSecure] = useState(true);

  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>{label}</Text>

      <View style={styles.inputRow}>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          secureTextEntry={secure}
          autoCapitalize="none"
          autoCorrect={false}
          style={styles.input}
          placeholderTextColor="#999"
        />

        <Pressable onPress={() => setSecure((s) => !s)} hitSlop={10}>
          <Text style={styles.eye}>{secure ? "👁️" : "🙈"}</Text>
        </Pressable>
      </View>

      {label === "Contraseña actual:" && (
        <Pressable onPress={() => {}} hitSlop={8}>
          <Text style={styles.forgot}>¿Olvidaste tu contraseña?</Text>
        </Pressable>
      )}
    </View>
  );
}
