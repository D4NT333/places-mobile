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

  input: {
    minHeight: 36,
    borderWidth: 1.8,
    borderColor: "#4B5563",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    fontSize: 16,
    color: "#111827",
    backgroundColor: "#FFFFFF",
  },

  multilineInput: {
    minHeight: 48,
    textAlignVertical: "top",
  },

  inputReview: {
    borderColor: "#EF4444",
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

  compareBox: {
    minHeight: 58,
    borderWidth: 1.8,
    borderColor: "#4B5563",
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 8,
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
  },

  oldValueText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#374151",
  },

  compareInput: {
    minHeight: 58,
    borderWidth: 1.8,
    borderColor: "#4B5563",
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontSize: 14,
    color: "#111827",
    backgroundColor: "#FFFFFF",
  },

  compareMultilineInput: {
    minHeight: 64,
    textAlignVertical: "top",
  },

  divider: {
    width: 2,
    marginHorizontal: 14,
    marginTop: 18,
    marginBottom: 10,
    backgroundColor: "#6B7280",
  },

  helperRow: {
    marginTop: 3,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  counterText: {
    fontSize: 12,
    fontWeight: "800",
    color: "#4B5563",
  },
});