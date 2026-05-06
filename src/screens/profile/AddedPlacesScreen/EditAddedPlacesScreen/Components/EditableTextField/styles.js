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

  inputReview: {
    borderColor: "#EF4444",
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

  divider: {
    width: 2,
    marginHorizontal: 14,
    marginTop: 18,
    marginBottom: 10,
    backgroundColor: "#6B7280",
  },

  input: {
  minHeight: 44,
  borderWidth: 1.8,
  borderColor: "#4B5563",
  borderRadius: 8,
  paddingHorizontal: 12,
  paddingVertical: 8,
  fontSize: 16,
  color: "#111827",
  backgroundColor: "#FFFFFF",
},

multilineInput: {
  minHeight: 54,
  textAlignVertical: "top",
},

compareBox: {
  minHeight: 74,
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
  flexWrap: "wrap",
},

compareInput: {
  minHeight: 74,
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
  minHeight: 74,
  textAlignVertical: "top",
},

helperRow: {
  marginTop: 3,
  flexDirection: "row",
  alignItems: "flex-start",
  justifyContent: "space-between",
  gap: 8,
},

helperText: {
  flex: 1,
  fontSize: 13,
  color: "#6B7280",
},

counterText: {
  fontSize: 12,
  fontWeight: "800",
  color: "#4B5563",
},

inputSuccess: {
  borderColor: "#22C55E",
},

counterSuccess: {
  color: "#15803D",
},

emptyHelperSpace: {
  flex: 1,
},
});