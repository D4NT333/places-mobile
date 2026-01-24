import React from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import styles from "./styles";

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
  onPressField, // si existe, el field funciona como "tocable" (para fecha)
}) {
  const Container = onPressField ? Pressable : View;

  return (
    <View style={styles.block}>
      <Container
        onPress={onPressField}
        style={[
          styles.wrap,
          !!errorText && styles.wrapError,
          onPressField && styles.wrapTouchable,
        ]}
      >
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#666"
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          autoCorrect={false}
          editable={!onPressField} // ✅ si es fecha, no se escribe manual (por ahora)
          pointerEvents={onPressField ? "none" : "auto"}
          style={styles.input}
        />

        {rightHint ? <Text style={styles.hint}>{rightHint}</Text> : null}
      </Container>

      {errorText ? <Text style={styles.error}>{errorText}</Text> : null}
      {!errorText && helperText ? <Text style={styles.helper}>{helperText}</Text> : null}
    </View>
  );
}
