import React from "react";
import { View, Text, Image } from "react-native";
import styles from "./styles";

export default function AuthHeader({subtitle}) {
  return (
    <View style={styles.container}>
      <View style={styles.logoWrap}>
        <Image
        source={require("../../../../../../assets/logoLsearch.png")}
        style={styles.logo}
       />
      </View>

      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
    </View>
  );
}
