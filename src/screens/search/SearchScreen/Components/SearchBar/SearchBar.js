import React from "react";
import { View, TextInput, Image } from "react-native";
import styles from "./styles";
import { icons } from "../../../../../../assets/icons";

export default function SearchBar({ value, onChangeText }) {
  return (
    <View style={styles.container}>
      <Image source={icons.buscar} style={styles.icon} />

      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder="Buscar"
        placeholderTextColor="#6B7280"
        style={styles.input}
        returnKeyType="search"
      />
    </View>
  );
}