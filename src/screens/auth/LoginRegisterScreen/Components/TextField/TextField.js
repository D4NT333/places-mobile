import React from "react";
import { Image, Pressable, Text, TextInput, View } from "react-native";
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
  onPressField,
  onBlur,

  // 👁️ NUEVO
  rightIconSource,
  onPressRightIcon,
}) {

    console.log("TextField:", placeholder, "rightIconSource:", rightIconSource);
  const isTouchable = !!onPressField;

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
            onBlur={onBlur}
            placeholder={placeholder}
            placeholderTextColor="#666"
            secureTextEntry={secureTextEntry}
            keyboardType={keyboardType}
            autoCapitalize={autoCapitalize}
            autoCorrect={false}
            style={styles.input}
          />

          {rightHint ? <Text style={styles.hint}>{rightHint}</Text> : null}

          {!!rightIconSource && (
            <Pressable
              onPress={onPressRightIcon}
              hitSlop={10}
              style={styles.rightIconButton}
            >
              <Image
                source={rightIconSource}
                style={styles.rightIcon}
                resizeMode="contain"
              />
            </Pressable>
          )}
        </View>
      )}

      {errorText ? <Text style={styles.error}>{errorText}</Text> : null}
      {!errorText && helperText ? <Text style={styles.helper}>{helperText}</Text> : null}
    </View>
  );
}