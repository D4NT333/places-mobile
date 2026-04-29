import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  finalMessageBox: {
    minHeight: 250,
    borderWidth: 2,
    borderColor: "#111827",
    borderRadius: 8,
    paddingHorizontal: 22,
    paddingTop: 22,
    alignItems: "center",
    marginTop: 14,
  },

  finalMessage: {
    fontSize: 12,
    fontWeight: "800",
    color: "#6b7280",
    textAlign: "center",
    lineHeight: 17,
  },

  submitButton: {
    marginTop: 20,
    height: 36,
    borderWidth: 2,
    borderColor: "#7b818a",
    borderRadius: 999,
    paddingHorizontal: 22,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },

  submitButtonText: {
    fontSize: 13,
    fontWeight: "800",
    color: "#4b5563",
  },
});

export default styles;