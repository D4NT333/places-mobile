import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import styles from "./styles";
import {icons} from "../../../../../../assets/icons";

export default function Header({ title, subtitle, onBack }) {
  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={onBack}
          activeOpacity={0.7}
        >
          <Image source={icons.flecha} style={styles.backIcon} />
        </TouchableOpacity>

        <Text style={styles.title}>{title}</Text>

        <View style={styles.placeholder} />
      </View>

      {!!subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
    </View>
  );
}