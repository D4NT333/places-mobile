import React from "react";
import {View, ScrollView, KeyboardAvoidingView, Platform, StatusBar, TouchableWithoutFeedback, Keyboard, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { spacing, list } from "../themes";
import { styles } from "./styles.js";

export default function LayoutScreen({
  children,
  scroll = false,
  keyboard = false,
  header = null,
  footer = null,
  padding = spacing.md,
  bg = list.background,
  barStyle = "dark-content", // light-content o dark-content
  safeArea = true,
  edges = ['top'],
  keyboardOffset = Platform.OS === 'ios' ? 0 : 20,
  dismissKeyboard = true,
  contentContainerStyle = {},
  centerContent = false,
}) {
  
  // Determinar el wrapper principal
  const Wrapper = scroll ? ScrollView : View;
  
  // Props específicas según el tipo de wrapper
  const wrapperProps = scroll
    ? {
      
        keyboardShouldPersistTaps: "handled",
        showsVerticalScrollIndicator: false,
        contentContainerStyle: {
          flexGrow: 1,
          padding: typeof padding === 'number' ? padding : 0,
          paddingTop: typeof padding === 'object' ? padding.top : undefined,
          paddingBottom: typeof padding === 'object' ? padding.bottom : undefined,
          paddingLeft: typeof padding === 'object' ? padding.left : undefined,
          paddingRight: typeof padding === 'object' ? padding.right : undefined,
          justifyContent: centerContent ? 'center' : 'flex-start',
          ...contentContainerStyle,
        },
      }
    : {
        style: {
          flex: 1,  
          padding: typeof padding === 'number' ? padding : 0,
          paddingTop: typeof padding === 'object' ? padding.top : undefined,
          paddingBottom: typeof padding === 'object' ? padding.bottom : undefined,
          paddingLeft: typeof padding === 'object' ? padding.left : undefined,
          paddingRight: typeof padding === 'object' ? padding.right : undefined,
          justifyContent: centerContent ? 'center' : 'flex-start',
        }
      };

  // Contenido principal
  const mainContent = (
    <>
      <StatusBar 
        barStyle={barStyle} 
        backgroundColor={bg}
        translucent={Platform.OS === 'android'}
      />
      
      {header && <View style={styles.headerContainer}>{header}</View>}
      
      <Wrapper {...wrapperProps}>
        {children}
      </Wrapper>

      {footer && (
        <View style={styles.footerContainer}>
          {footer}
        </View>
      )}
    </>
  );

  // Aplicar SafeAreaView si es necesario
  const safeContent = safeArea ? (
    <SafeAreaView 
     // style={[styles.safeArea, { backgroundColor: bg }]} 
      //edges={edges}
      style={{ flex: 1, backgroundColor: "yellow" }} edges={edges}
    >
      {mainContent}
    </SafeAreaView>
    
  ) : (
    <View style={[styles.container, { backgroundColor: bg }]}>
      {mainContent}
    </View>
  );

  // Si no necesita keyboard handling, retornar directo
  if (!keyboard) {
    return safeContent;
  }

  // Con keyboard handling
  const keyboardContent = (
    <KeyboardAvoidingView
      style={styles.keyboardView}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={keyboardOffset}
    >
      {safeContent}
    </KeyboardAvoidingView>
  );

  // Opcional: cerrar teclado al tocar fuera
  if (dismissKeyboard) {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        {keyboardContent}
      </TouchableWithoutFeedback>
    );
  }

  return keyboardContent;
}
