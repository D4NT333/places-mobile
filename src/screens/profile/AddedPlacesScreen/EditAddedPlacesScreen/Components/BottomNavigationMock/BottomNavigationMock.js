import React from "react";
import { Text, View } from "react-native";

import styles from "./styles";

export default function BottomNavigationMock() {
  return (
    <View style={styles.bottomBar}>
      <Text style={styles.bottomBarText}>Barra de navegación</Text>
    </View>
  );
}