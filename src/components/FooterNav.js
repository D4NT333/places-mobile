import React from "react";
import { View, Pressable, Image } from "react-native";
import styles from "./styles";
import { icons } from "../../assets/icons";

export default function FooterNav({ index, onNavigate }) {
  return (
    <View style={styles.container}>
      <Pressable onPress={() => onNavigate(0)}>
        <Image source={icons.home} style={[styles.icon, index === 0 && { opacity: 1 }]} />
      </Pressable>

      <Pressable onPress={() => onNavigate(1)}>
        <Image source={icons.buscar} style={[styles.icon, index === 1 && { opacity: 1 }]} />
      </Pressable>

      <Pressable onPress={() => onNavigate(2)}>
        <Image source={icons.add} style={[styles.icon, index === 2 && { opacity: 1 }]} />
      </Pressable>

      <Pressable onPress={() => onNavigate(3)}>
        <Image source={icons.metrics} style={[styles.icon, index === 3 && { opacity: 1 }]} />
      </Pressable>

      <Pressable onPress={() => onNavigate(4)}>
        <Image source={icons.usuario} style={[styles.icon, index === 4 && { opacity: 1 }]} />
      </Pressable>
    </View>
  );
}