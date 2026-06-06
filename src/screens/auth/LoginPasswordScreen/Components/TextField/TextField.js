import React, { useState } from "react";
import { Image, Pressable, Text, TextInput, View } from "react-native";
import styles from "./styles";

import { icons } from "../../../../../../assets/icons";

export default function TextField({
  value,
  onChangeText,
  placeholder,
  secureTextEntry,
  keyboardType,
  autoCapitalize = "none",
  helperText = "",
  errorText = "",
  rightHint = "",
  onPressField,
}) {
  const [showPassword, setShowPassword] = useState(false);

  const isTouchable = !!onPressField;
  const isPasswordField = !!secureTextEntry;

  return (
    <View style={styles.block}>
      {isTouchable ? (
        <Pressable
          onPress={onPressField}
          style={[
            styles.wrap,
            styles.wrapTouchable,
            !!errorText && styles.wrapError,
          ]}
        >
          <Text style={[styles.input, !value && styles.placeholderText]}>
            {value || placeholder}
          </Text>

          {rightHint ? <Text style={styles.hint}>{rightHint}</Text> : null}
        </Pressable>
      ) : (
        <View
          style={[
            styles.wrap,
            !!errorText && styles.wrapError,
          ]}
        >
  <TextInput
  value={value}
  onChangeText={onChangeText}
  placeholder={placeholder}
  placeholderTextColor="#666"
  secureTextEntry={isPasswordField && !showPassword}
  keyboardType={keyboardType}
  autoCapitalize={autoCapitalize}
  autoCorrect={false}
  underlineColorAndroid="transparent"
  cursorColor="#7CC9C6"
  selectionColor="#7CC9C6"
  style={[
    styles.input,
    isPasswordField && styles.inputPassword,
  ]}
/>

          {isPasswordField ? (
            <Pressable
              onPress={() => setShowPassword((value) => !value)}
              style={styles.eyeButton}
              hitSlop={10}
            >
              <Image
                source={showPassword ? icons.openeye : icons.closedeye}
                style={styles.eyeIcon}
              />
            </Pressable>
          ) : rightHint ? (
            <Text style={styles.hint}>{rightHint}</Text>
          ) : null}
        </View>
      )}

      {errorText ? <Text style={styles.error}>{errorText}</Text> : null}
      {!errorText && helperText ? <Text style={styles.helper}>{helperText}</Text> : null}
    </View>
  );
}