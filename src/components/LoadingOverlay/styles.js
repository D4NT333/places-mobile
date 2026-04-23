import { StyleSheet } from "react-native";

export default StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.28)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },

  card: {
    width: "100%",
    maxWidth: 300,
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    paddingVertical: 24,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    elevation: 6,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
  },

  successIcon: {
    fontSize: 34,
    fontWeight: "800",
    color: "#16A34A",
  },

  title: {
    fontSize: 18,
    fontWeight: "800",
    color: "#111827",
    textAlign: "center",
  },

  message: {
    fontSize: 14,
    color: "#6B7280",
    textAlign: "center",
    lineHeight: 20,
  },
});