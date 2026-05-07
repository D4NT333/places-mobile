import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    marginBottom: 22,
  },

  labelRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  label: {
    fontSize: 22,
    fontWeight: "900",
    color: "#374151",
    marginBottom: 8,
  },

  editText: {
    fontSize: 16,
    fontWeight: "900",
    color: "#374151",
  },

  mapBox: {
    width: "100%",
    height: 150,
    borderWidth: 1.8,
    borderColor: "#4B5563",
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },

  mapBoxReview: {
    borderColor: "#EF4444",
  },

  mapFallbackText: {
    fontSize: 16,
    fontWeight: "900",
    color: "#6B7280",
  },

  helperText: {
    marginTop: 6,
    fontSize: 14,
    fontWeight: "700",
    color: "#6B7280",
  },

  helperReview: {
    color: "#B91C1C",
  },

  coordinateText: {
    marginTop: 4,
    fontSize: 12,
    fontWeight: "800",
    color: "#6B7280",
  },

  mapCompareBlock: {
    marginBottom: 18,
  },

  compareLabel: {
    fontSize: 18,
    fontWeight: "900",
    color: "#374151",
    marginBottom: 8,
  },
});