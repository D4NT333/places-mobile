import { StyleSheet } from "react-native";

export default StyleSheet.create({
  row: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 14,
  },

  chip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    borderWidth: 1.5,
    borderColor: "#111",
    backgroundColor: "#FFF",
    alignItems: "center",
    justifyContent: "center",
    minWidth: 92,
  },
  chipSelected: {
    backgroundColor: "#111",
  },

  chipText: {
    fontSize: 12,
    color: "#111",
    fontWeight: "600",
    textAlign: "center",
    lineHeight: 14,
  },
  chipTextSelected: {
    color: "#FFF",
  },
});
