import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },

  chip: {
    minHeight: 38,
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 999,
    borderWidth: 2,
    borderColor: "#1A1A1A",
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },

  chipSmall: {
    minWidth: 96,
  },

  chipMedium: {
    minWidth: 112,
  },

  chipSelected: {
    backgroundColor: "#050505",
  },

  chipPressed: {
    opacity: 0.75,
    transform: [{ scale: 0.98 }],
  },

  chipText: {
    fontSize: 14,
    fontWeight: "800",
    color: "#1A1A1A",
    textAlign: "center",
  },

  chipTextSmall: {
    fontSize: 13,
  },

  chipTextSelected: {
    color: "#FFFFFF",
  },
});