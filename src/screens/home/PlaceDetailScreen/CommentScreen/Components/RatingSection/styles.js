import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
  },

  title: {
    fontSize: 24,
    lineHeight: 30,
    fontWeight: "700",
    color: "#2A2A2A",
    textAlign: "center",
    marginBottom: 22,
  },

  starsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 6,
  },

  starItem: {
    flex: 1,
    alignItems: "center",
  },

  star: {
    fontSize: 42,
    lineHeight: 46,
    color: "#D1D5DB",
    marginBottom: 6,
  },

  starSelected: {
    color: "#111111",
  },

  starLabel: {
    fontSize: 11,
    lineHeight: 14,
    color: "#4B5563",
    textAlign: "center",
  },
});

export default styles;