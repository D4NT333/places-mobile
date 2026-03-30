import React from "react";
import { View, Text, TextInput } from "react-native";
import styles from "./styles";

export default function SearchBar({
  value,
  onChangeText,
  placeholder = "Buscar",
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.icon}>🔍</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        autoCorrect={false}
        autoCapitalize="none"
        style={styles.input}
        returnKeyType="search"
      />
    </View>
  );
}
