import React from "react";
import { View, Text, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LayoutScreen } from "../../../../layouts";

import styles from "./styles";
import {SettingSection, SettingRow} from "./Components"
import { settingsSections } from "./data";

import { logoutService } from "../../../../services";

export default function SettingsProfileScreen() {
  const navigation = useNavigation();


  const handleLogout = async () => {
  try {
    await logoutService();
    console.log("Sesión cerrada con éxito");

  } catch (error) {
    console.log("Error al cerrar sesión:", error);
  }
};

  return (
    <LayoutScreen
      scroll
      edges={["top"]}
      padding={{ top: 16, left: 16, right: 16, bottom: 24 }}
      bg="#FFFFFF"
    >
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backIcon}>‹</Text>
        </Pressable>

        <Text style={styles.headerTitle}>Configuración</Text>
        <View style={{ width: 36 }} />
      </View>

      {/* Secciones */}
      {settingsSections.map((section) => (
        <SettingSection key={section.title} title={section.title}>
          {section.items.map((item, idx) => (
            <SettingRow
              key={item.label}
              label={item.label}
              onPress={() => navigation.navigate(item.route)}
              last={idx === section.items.length - 1}
            />
          ))}
        </SettingSection>
      ))}

      {/* Cerrar sesión */}
      <Pressable
        onPress={handleLogout}
        style={({ pressed }) => [styles.logoutBtn, pressed && styles.logoutPressed]}
      >
        <Text style={styles.logoutText}>Cerrar sesión</Text>
      </Pressable>

      <View style={{ height: 24 }} />
    </LayoutScreen>
  );
}
