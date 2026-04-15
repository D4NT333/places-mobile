import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },

  inputWrapper: {
    minHeight: 136,
    borderWidth: 2,
    borderColor: "#2A2A2A",
    borderRadius: 14,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    paddingVertical: 14,
  },

  input: {
    minHeight: 104,
    fontSize: 20,
    lineHeight: 26,
    fontWeight: "500",
    color: "#374151",
    textAlign: "center",
  },

  footerRow: {
    marginTop: 8,
    paddingHorizontal: 6,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  helperText: {
    fontSize: 14,
    lineHeight: 18,
    color: "#6B7280",
  },

  counterText: {
    fontSize: 14,
    lineHeight: 18,
    fontWeight: "600",
    color: "#4B5563",
  },
});

export default styles;