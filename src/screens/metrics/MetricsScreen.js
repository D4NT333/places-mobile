import React from "react";
import { ScrollView, View, Text } from "react-native";

import { LayoutScreen } from "../../layouts";

import styles from "./styles";
import {
  summaryMetrics,
  weeklyActivityData,
  trendData,
  favoriteCategoriesData,
  topPlacesData,
  exploredZonesData,
} from "./data";

import MetricCard from "./Components/MetricCard";
import WeeklyActivityChart from "./Components/WeeklyActivityChart";
import TrendLineChart from "./Components/TrendLineChart";
import CategoryProgressList from "./Components/CategoryProgressList";
import TopPlacesList from "./Components/TopPlacesList";
import ExploredZones from "./Components/ExploredZones";

export default function MetricsScreen() {
  return (
    <LayoutScreen
      edges={["top"]}
      padding={{ top: 0, left: 0, right: 0, bottom: 0 }}
      bg="#F6F7FB"
    >
      <ScrollView
        style={styles.screen}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Tus métricas</Text>
          <Text style={styles.subtitle}>
            Un resumen visual de tu actividad, gustos y zonas exploradas dentro
            de Lsearch.
          </Text>
        </View>

        <View style={styles.cardsGrid}>
          {summaryMetrics.map((metric) => (
            <MetricCard
              key={metric.id}
              label={metric.label}
              value={metric.value}
              helper={metric.helper}
            />
          ))}
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Actividad semanal</Text>
            <Text style={styles.sectionSubtitle}>
              Interacciones realizadas durante los últimos 7 días.
            </Text>
          </View>

          <WeeklyActivityChart data={weeklyActivityData} />
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Búsquedas recientes</Text>
            <Text style={styles.sectionSubtitle}>
              Evolución aproximada de tus búsquedas durante las últimas semanas.
            </Text>
          </View>

          <TrendLineChart data={trendData} />
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Categorías favoritas</Text>
            <Text style={styles.sectionSubtitle}>
              Distribución de tus intereses principales.
            </Text>
          </View>

          <CategoryProgressList data={favoriteCategoriesData} />
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Lugares más consultados</Text>
            <Text style={styles.sectionSubtitle}>
              Sitios que más has visitado dentro de la aplicación.
            </Text>
          </View>

          <TopPlacesList data={topPlacesData} />
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Zonas exploradas</Text>
            <Text style={styles.sectionSubtitle}>
              Áreas de la ciudad donde has descubierto más lugares.
            </Text>
          </View>

          <ExploredZones data={exploredZonesData} />
        </View>
      </ScrollView>
    </LayoutScreen>
  );
}