import React from "react";
import { Pressable, Text, View, Image } from "react-native";
import { icons } from "../../../../../../assets/icons";

import styles from "./styles";

export default function ProfileOption({
  label,
  icon,
  onPress,
  isSubOption = false,
}) {
  const iconSource = icon ? icons[icon] : null;

  const iconStyle = [
    styles.icon,
    icon === "heart" && styles.heartIcon,
  ];

  return (
    <Pressable onPress={onPress} style={styles.pressable}>
      <View style={[styles.row, isSubOption && styles.subRow]}>
        <Text style={[styles.label, isSubOption && styles.subLabel]}>
          {label}
        </Text>

        {iconSource ? (
          <Image
            source={iconSource}
            style={iconStyle}
            resizeMode="contain"
          />
        ) : (
          <View style={styles.emptyIconSpace} />
        )}
      </View>

      <View style={[styles.divider, isSubOption && styles.subDivider]} />
    </Pressable>
  );
}