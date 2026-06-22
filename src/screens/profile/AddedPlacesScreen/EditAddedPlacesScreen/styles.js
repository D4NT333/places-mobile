import { StyleSheet } from "react-native";

export default StyleSheet.create({
  screen: {
    flex: 1,
  },

  scrollContent: {
    paddingTop: 10,
    paddingBottom: 120,
  },

  stateText: {
    marginBottom: 14,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 16,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    fontSize: 14,
    fontWeight: "700",
    color: "#4B5563",
  },

  errorText: {
    marginBottom: 14,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 16,
    backgroundColor: "#FEF2F2",
    borderWidth: 1,
    borderColor: "#FCA5A5",
    fontSize: 14,
    fontWeight: "800",
    color: "#B91C1C",
  },

  generalMessageBox: {
    marginBottom: 22,
    borderWidth: 1.5,
    borderColor: "#B91C1C",
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 13,
    backgroundColor: "#FEF2F2",
  },

  generalMessageText: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "800",
    color: "#B91C1C",
  },
});