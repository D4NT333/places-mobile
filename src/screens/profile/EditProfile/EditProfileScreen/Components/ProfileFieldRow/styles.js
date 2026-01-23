import { StyleSheet } from "react-native";

export default StyleSheet.create({
  wrap: { gap: 8 },
  wrapMultiline: { gap: 8 },
  label: { fontSize: 12, color: "#111", fontWeight: "600" },
  field: {
    borderWidth: 1,
    borderColor: "#111",
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  fieldMultiline: {
    borderRadius: 12,
    minHeight: 140,
    paddingTop: 10,
    paddingBottom: 10,
  },
  value: { fontSize: 14, color: "#111" },
  valueEmpty: { opacity: 0.5 },
});
