import React from "react";
import { View } from "react-native";
import { CartesianChart, Bar } from "victory-native";

import styles from "./styles";

export default function WeeklyActivityChart({ data }) {
  return (
    <View style={styles.chartContainer}>
      <CartesianChart
        data={data}
        xKey="day"
        yKeys={["interactions"]}
        domain={{ y: [0, 30] }}
        domainPadding={{ left: 28, right: 28, top: 18 }}
        padding={{
          left: 8,
          right: 8,
          top: 8,
          bottom: 8,
        }}
        xAxis={{
          lineColor: "transparent",
          labelColor: "#6B7280",
        }}
        yAxis={[
          {
            yKeys: ["interactions"],
            lineColor: "transparent",
            labelColor: "#9CA3AF",
            tickCount: 4,
          },
        ]}
      >
        {({ points, chartBounds }) => (
          <Bar
            points={points.interactions}
            chartBounds={chartBounds}
            color="#538DE4"
            roundedCorners={{
              topLeft: 8,
              topRight: 8,
            }}
            animate={{
              type: "spring",
            }}
          />
        )}
      </CartesianChart>
    </View>
  );
}