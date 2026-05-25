import React, { useEffect, useRef } from "react";
import { View, Pressable, Image, Animated } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import styles from "./styles";
import { icons } from "../../../assets/icons";

function FooterItem({ icon, isActive, onPress }) {
  const scale = useRef(new Animated.Value(isActive ? 1 : 0)).current;
  const opacity = useRef(new Animated.Value(isActive ? 1 : 0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scale, {
        toValue: isActive ? 1 : 0,
        speed: 22,
        bounciness: isActive ? 8 : 0,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: isActive ? 1 : 0,
        duration: isActive ? 150 : 90,
        useNativeDriver: true,
      }),
    ]).start();
  }, [isActive, scale, opacity]);

  return (
    <Pressable onPress={onPress} style={styles.item}>
      <Animated.View
        style={[
          styles.activeCircle,
          {
            opacity,
            transform: [{ scale }],
          },
        ]}
      />

      <Image
        source={icon}
        style={[
          styles.icon,
          isActive ? styles.activeIcon : styles.inactiveIcon,
        ]}
      />
    </Pressable>
  );
}

export default function FooterNav({ index, onNavigate }) {
  const insets = useSafeAreaInsets();

  const items = [
    icons.add,
    icons.metrics,
    icons.home,
    icons.buscar,
    icons.usuario,
  ];

  return (
    <View style={[styles.wrapper, { paddingBottom: insets.bottom }]}>
      <View style={styles.container}>
        {items.map((icon, i) => (
          <FooterItem
            key={i}
            icon={icon}
            isActive={index === i}
            onPress={() => onNavigate(i)}
          />
        ))}
      </View>
    </View>
  );
}