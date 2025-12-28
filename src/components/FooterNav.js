import React from "react";
import { View, Pressable, Image } from "react-native";
import styles from "./styles";
import { icons } from "../../assets/icons";

export default function FooterNav({ state, navigation }) {
  const go = (name) => navigation.navigate(name);

  return (
    <View style={styles.container}>
      <Pressable onPress={() => go("Home")}>
        <Image
          source={icons.home}
          style={[styles.icon, state.index === 0 && { opacity: 1 }]}
        />
      </Pressable>

      <Pressable onPress={() => go("Search")}>
        <Image
          source={icons.buscar}
          style={[styles.icon, state.index === 1 && { opacity: 1 }]}
        />
      </Pressable>

      <Pressable onPress={() => go("Add")}>
        <Image
          source={icons.add}
          style={[styles.icon, state.index === 2 && { opacity: 1 }]}
        />
      </Pressable>

      <Pressable onPress={() => go("Metrics")}>
        <Image
          source={icons.metrics}
          style={[styles.icon, state.index === 3 && { opacity: 1 }]}
        />
      </Pressable>

      <Pressable onPress={() => go("User")}>
        <Image
          source={icons.usuario}
          style={[styles.icon, state.index === 4 && { opacity: 1 }]}
        />
      </Pressable>
    </View>
  );
}
