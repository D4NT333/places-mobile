import React, { useState } from "react";
import { View, Text, TextInput, Pressable, Image } from "react-native";

import { icons } from "../../../../../../../assets/icons";

import styles from "./styles";

export default function PasswordPill({ label, value, onChangeText }) {
  const [visible, setVisible] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>

      <View style={styles.inputWrapper}>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder="Ingresa tu contraseña"
          placeholderTextColor="#9A9A9A"
          secureTextEntry={!visible}
          autoCapitalize="none"
          autoCorrect={false}
          style={styles.input}
        />

        <Pressable
          onPress={() => setVisible((current) => !current)}
          style={styles.eyeButton}
          hitSlop={10}
        >
          <Image
            source={visible ? icons.openeye : icons.closedeye}
            style={styles.eyeIcon}
          />
        </Pressable>
      </View>
    </View>
  );
}