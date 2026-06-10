import { StyleSheet } from "react-native";

export default StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  headerRow: {
    minHeight: 44,
    flexDirection: "row",
    alignItems: "center",
  },

  closeButton: {
    width: 38,
    height: 38,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 6,
  },

  closeText: {
    fontSize: 22,
    fontWeight: "900",
    color: "#111111",
  },

  placeName: {
    flex: 1,
    fontSize: 22,
    fontWeight: "900",
    color: "#111111",
  },

  statusText: {
    maxWidth: 96,
    fontSize: 14,
    fontWeight: "800",
    color: "#555555",
    textAlign: "right",
    marginLeft: 8,
  },

  content: {
    paddingTop: 18,
    paddingBottom: 24,
  },

  submittedAt: {
    fontSize: 15,
    fontWeight: "700",
    color: "#555555",
    marginBottom: 12,
  },

  descriptionIntro: {
    fontSize: 15,
    fontWeight: "600",
    color: "#333333",
    lineHeight: 20,
    marginBottom: 8,
  },

  divider: {
    height: 1.5,
    backgroundColor: "#4F5660",
    marginBottom: 18,
  },

  bottomSpace: {
    height: 40,
  },
});