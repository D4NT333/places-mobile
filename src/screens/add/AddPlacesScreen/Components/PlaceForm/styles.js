import { StyleSheet } from "react-native";

export default StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 14,
    padding: 12,
    gap: 12,
  },
  field: {
    gap: 6,
  },
  label: {
    fontSize: 12,
    fontWeight: "600",
    color: "#111",
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 10,
    paddingHorizontal: 12,
    color: "#111",
    backgroundColor: "#FFF",
  },
  inputMultiline: {
    height: 80,
    paddingTop: 10,
    textAlignVertical: "top",
  },
  chipsWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  chip: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 999,
    borderWidth: 1,
  },
  chipActive: {
    backgroundColor: "#111",
    borderColor: "#111",
  },
  chipInactive: {
    backgroundColor: "#F3F4F6",
    borderColor: "#E5E7EB",
  },
  chipText: {
    fontSize: 12,
    fontWeight: "600",
  },
  chipTextActive: {
    color: "#FFF",
  },
  chipTextInactive: {
    color: "#111",
  },
  filterButton: {
  marginTop: 8,
  paddingVertical: 12,
  paddingHorizontal: 16,
  backgroundColor: "#fff",
  borderRadius: 20,
  borderWidth: 1,
  borderColor: "#9CA3AF",
  alignSelf: "flex-start",
},

filterButtonText: {
  fontSize: 14,
  fontWeight: "600",
  color: "#111827",
},
charCount: {
  marginTop: 6,
  alignSelf: "flex-end",
  fontSize: 12,
  color: "#6B7280",
},

charCount: {
  marginTop: 6,
  alignSelf: "flex-end",
  fontSize: 12,
  color: "#6B7280", // gris
},

charCountWarning: {
  marginTop: 6,
  alignSelf: "flex-end",
  fontSize: 12,
  color: "#F59E0B", // amarillo
},

charCountDanger: {
  marginTop: 6,
  alignSelf: "flex-end",
  fontSize: 12,
  color: "#DC2626", // rojo
},

inputWarning: {
  borderColor: "#F59E0B",
},

inputDanger: {
  borderColor: "#DC2626",
},
});
