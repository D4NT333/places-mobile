import React, { useMemo, useState } from "react";
import { View, Text, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LayoutScreen } from "../../../../layouts";

import styles from "./styles";
import { notificationSections } from "./data";
import NotificationCard from "./Components/NotificationCard";
import NotificationToggle from "./Components/NotificationToggle";

export default function NotificationScreen() {
  const navigation = useNavigation();

  // Estado inicial basado en data.js
  const initialState = useMemo(() => {
    const state = {};
    notificationSections.forEach((section) => {
      section.items.forEach((it) => {
        state[it.key] = !!it.defaultValue;
      });
    });
    return state;
  }, []);

  const [toggles, setToggles] = useState(initialState);

  const setToggle = (key, value) => {
    setToggles((prev) => ({ ...prev, [key]: value }));
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

        <Text style={styles.headerTitle}>Notificaciones</Text>
        <View style={{ width: 36 }} />
      </View>

      {/* Cards */}
      {notificationSections.map((section) => (
        <NotificationCard key={section.title} style={{ marginBottom: 16 }}>
          {section.items.map((item, idx) => (
            <NotificationToggle
              key={item.key}
              label={item.label}
              value={toggles[item.key]}
              onChange={(val) => setToggle(item.key, val)}
              last={idx === section.items.length - 1}
            />
          ))}
        </NotificationCard>
      ))}

      <View style={{ height: 24 }} />
    </LayoutScreen>
  );
}
