import React from "react";
import { View, Text, ScrollView } from "react-native";
import styles from "./styles";

export default function TermsCard({ sections = [] }) {
  return (
    <View style={styles.card}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {sections.map((s, i) => (
          <View key={`${s.title}-${i}`} style={styles.section}>
            <Text style={styles.sectionTitle}>{s.title}</Text>
            <Text style={styles.sectionText}>{s.text}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
