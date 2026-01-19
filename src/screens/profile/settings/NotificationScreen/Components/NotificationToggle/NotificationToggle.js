import React from "react";
import { View, Text, Switch } from "react-native";
import styles from "./styles";

export default function NotificationToggle({
  label,
  value,
  onChange,
  last = false,
}) {
  return (
    <View style={[styles.row, !last && styles.rowDivider]}>
      <Text style={styles.label}>{label}</Text>

      <Switch
        value={value}
        onValueChange={onChange}
        trackColor={{ false: "#E5E5E5", true: "#111111" }}
        thumbColor={"#FFFFFF"}
      />
    </View>
  );
}
