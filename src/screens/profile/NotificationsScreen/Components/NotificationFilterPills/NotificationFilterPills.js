import React from "react";
import { Pressable, Text, View } from "react-native";

import styles from "./styles";

export default function NotificationFilterPills({ activeFilter, onChange }) {
  return (
    <View style={styles.container}>
      <Pressable
        style={[
          styles.pill,
          activeFilter === "all" && styles.pillActive,
        ]}
        onPress={() => onChange("all")}
      >
        <Text
          style={[
            styles.pillText,
            activeFilter === "all" && styles.pillTextActive,
          ]}
        >
          Todas
        </Text>
      </Pressable>

      <Pressable
        style={[
          styles.pill,
          activeFilter === "unread" && styles.pillActive,
        ]}
        onPress={() => onChange("unread")}
      >
        <Text
          style={[
            styles.pillText,
            activeFilter === "unread" && styles.pillTextActive,
          ]}
        >
          No leídas
        </Text>
      </Pressable>
    </View>
  );
}