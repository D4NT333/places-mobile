import React from "react";
import { View } from "react-native";
import styles from "./styles";

export default function NotificationCard({ children, style }) {
  return <View style={[styles.card, style]}>{children}</View>;
}
