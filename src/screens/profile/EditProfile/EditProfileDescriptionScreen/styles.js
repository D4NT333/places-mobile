import { StyleSheet } from "react-native";

export default StyleSheet.create({
  section: { marginTop: 14, gap: 8 },
  label: { fontSize: 12, fontWeight: "600", color: "#111" },
  inputBox: {
    borderWidth: 1,
    borderColor: "#111",
    borderRadius: 14,
    padding: 10,
    minHeight: 140,
  },
  textArea: { fontSize: 14, color: "#111", minHeight: 90, textAlignVertical: "top" },
  counterRow: { alignItems: "flex-end" },
  counter: { fontSize: 12, color: "#111", opacity: 0.7 },
});
