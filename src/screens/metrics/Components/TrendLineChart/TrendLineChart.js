import React from "react";
import { View } from "react-native";
import { CartesianChart, Line } from "victory-native";

import styles from "./styles";

export default function TrendLineChart({ data }) {
  return (
    <View style={styles.chartContainer}>
      <CartesianChart
        data={data}
        xKey="week"
        yKeys={["searches"]}
        domain={{ y: [0, 50] }}
        domainPadding={{ left: 24, right: 24, top: 18 }}
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
            yKeys: ["searches"],
            lineColor: "transparent",
            labelColor: "#9CA3AF",
            tickCount: 5,
          },
        ]}
      >
        {({ points }) => (
          <Line
            points={points.searches}
            color="#111827"
            strokeWidth={4}
            curveType="monotoneX"
            animate={{
              type: "timing",
              duration: 600,
            }}
          />
        )}
      </CartesianChart>
    </View>
  );
}