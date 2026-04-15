import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.28)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },

  card: {
    width: "100%",
    maxWidth: 360,
    minHeight: 220,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#2A2A2A",
    paddingHorizontal: 22,
    paddingTop: 28,
    paddingBottom: 24,
    justifyContent: "space-between",
  },

  message: {
    flex: 1,
    fontSize: 22,
    lineHeight: 30,
    fontWeight: "600",
    color: "#2A2A2A",
    textAlign: "center",
    textAlignVertical: "center",
    includeFontPadding: false,
  },

  actionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 16,
  },

  secondaryButton: {
    flex: 1,
    minHeight: 48,
    paddingHorizontal: 18,
    borderWidth: 2,
    borderColor: "#5B6470",
    borderRadius: 999,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },

  secondaryButtonText: {
    fontSize: 16,
    lineHeight: 20,
    fontWeight: "600",
    color: "#4B5563",
    textAlign: "center",
  },

  primaryButton: {
    flex: 1,
    minHeight: 48,
    paddingHorizontal: 18,
    borderWidth: 2,
    borderColor: "#5B6470",
    borderRadius: 999,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },

  primaryButtonText: {
    fontSize: 16,
    lineHeight: 20,
    fontWeight: "600",
    color: "#4B5563",
    textAlign: "center",
  },
});

export default styles;