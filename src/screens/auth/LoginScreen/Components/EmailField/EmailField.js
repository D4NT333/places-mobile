import React from "react";
import { TextInput, View } from "react-native";
import styles from "./styles";

export default function EmailField({ value, onChangeText, placeholder = "Correo" }) {
  return (
    <View style={styles.wrap}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#666"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        style={styles.input}
      />
    </View>
  );
}
