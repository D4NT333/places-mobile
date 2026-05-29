import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    gap: 14,
  },

  item: {
    gap: 8,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  name: {
    fontSize: 14,
    fontWeight: "800",
    color: "#1F2937",
  },

  percentage: {
    fontSize: 13,
    fontWeight: "900",
    color: "#538DE4",
  },

  track: {
    height: 10,
    backgroundColor: "#E8EEF9",
    borderRadius: 999,
    overflow: "hidden",
  },

  fill: {
    height: "100%",
    backgroundColor: "#538DE4",
    borderRadius: 999,
  },
});

export default styles;