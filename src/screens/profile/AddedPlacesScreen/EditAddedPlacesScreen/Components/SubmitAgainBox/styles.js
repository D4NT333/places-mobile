import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    minHeight: 220,
    borderWidth: 1.8,
    borderColor: "#111827",
    borderRadius: 8,
    paddingHorizontal: 18,
    paddingTop: 28,
    alignItems: "center",
    marginBottom: 28,
  },

  warningText: {
    textAlign: "center",
    fontSize: 14,
    fontWeight: "800",
    lineHeight: 20,
    color: "#6B7280",
  },

  button: {
    marginTop: 28,
    borderWidth: 1.8,
    borderColor: "#6B7280",
    borderRadius: 999,
    paddingHorizontal: 22,
    paddingVertical: 8,
  },

  buttonText: {
    fontSize: 15,
    fontWeight: "900",
    color: "#4B5563",
  },
});