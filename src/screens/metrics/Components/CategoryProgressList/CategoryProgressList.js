import React from "react";
import { View, Text } from "react-native";

import styles from "./styles";

export default function CategoryProgressList({ data }) {
  return (
    <View style={styles.container}>
      {data.map((category) => (
        <View key={category.id} style={styles.item}>
          <View style={styles.row}>
            <Text style={styles.name}>{category.name}</Text>
            <Text style={styles.percentage}>{category.percentage}%</Text>
          </View>

          <View style={styles.track}>
            <View
              style={[
                styles.fill,
                {
                  width: `${category.percentage}%`,
                },
              ]}
            />
          </View>
        </View>
      ))}
    </View>
  );
}