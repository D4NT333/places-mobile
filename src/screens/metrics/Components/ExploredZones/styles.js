import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },

  chip: {
    backgroundColor: "#F3F6FF",
    borderRadius: 18,
    paddingVertical: 10,
    paddingHorizontal: 14,
  },

  name: {
    fontSize: 13,
    fontWeight: "900",
    color: "#1F2937",
  },

  places: {
    marginTop: 3,
    fontSize: 11,
    color: "#6B7280",
  },
});

export default styles;