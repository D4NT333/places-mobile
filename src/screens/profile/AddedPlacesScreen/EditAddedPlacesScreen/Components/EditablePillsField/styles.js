import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    marginBottom: 18,
  },

  labelRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 6,
  },

  label: {
    fontSize: 18,
    fontWeight: "800",
    color: "#4B5563",
  },

  editText: {
    fontSize: 15,
    fontWeight: "800",
    color: "#4B5563",
  },

  pillsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },

  pill: {
    minWidth: 90,
    borderWidth: 1.8,
    borderColor: "#4B5563",
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 2,
    alignItems: "center",
  },

  pillReview: {
    borderColor: "#EF4444",
  },

  pillText: {
    fontSize: 13,
    fontWeight: "800",
    color: "#4B5563",
  },

  helperText: {
    marginTop: 4,
    fontSize: 13,
    color: "#6B7280",
  },

  helperReview: {
    color: "#B91C1C",
    fontWeight: "600",
  },

  compareContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },

  compareColumn: {
    flex: 1,
  },

  compareLabel: {
    marginBottom: 6,
    fontSize: 13,
    fontWeight: "800",
    color: "#4B5563",
  },

  comparePillsColumn: {
    gap: 8,
  },

  divider: {
    width: 2,
    marginHorizontal: 14,
    marginTop: 18,
    marginBottom: 6,
    backgroundColor: "#6B7280",
  },
});