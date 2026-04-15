import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 16,
  },

  secondaryButton: {
    minHeight: 42,
    paddingHorizontal: 16,
    borderWidth: 2,
    borderColor: "#6B7280",
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
  },

  secondaryButtonText: {
    fontSize: 16,
    lineHeight: 20,
    fontWeight: "500",
    color: "#4B5563",
    textAlign: "center",
  },

  primaryButton: {
    minWidth: 128,
    minHeight: 48,
    paddingHorizontal: 22,
    borderWidth: 2,
    borderColor: "#6B7280",
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
  },

  primaryButtonDisabled: {
    opacity: 0.45,
  },

  primaryButtonText: {
    fontSize: 18,
    lineHeight: 22,
    fontWeight: "700",
    color: "#4B5563",
  },

  primaryButtonTextDisabled: {
    color: "#6B7280",
  },
  buttonPlaceholder: {
  flex: 1,
},
});

export default styles;