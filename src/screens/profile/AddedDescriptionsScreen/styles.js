import { StyleSheet } from "react-native";

export default StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  header: {
    minHeight: 42,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  backButton: {
    width: 38,
    height: 38,
    alignItems: "center",
    justifyContent: "center",
  },

  backIcon: {
    width: 23,
    height: 23,
    resizeMode: "contain",
    tintColor: "#111111",
  },

  headerTitle: {
    flex: 1,
    textAlign: "left",
    fontSize: 22,
    fontWeight: "900",
    color: "#111111",
  },

  headerSpacer: {
    width: 38,
    height: 38,
  },

  subtitle: {
    marginTop: 8,
    marginBottom: 20,
    paddingHorizontal: 6,
    textAlign: "left",
    fontSize: 14,
    fontWeight: "700",
    color: "#555555",
    lineHeight: 22,
  },

  content: {
    paddingBottom: 20,
    gap: 14,
  },

  bottomSpace: {
    height: 40,
  },
emptyBox: {
  alignItems: "center",
  justifyContent: "center",
  paddingVertical: 48,
  paddingHorizontal: 16,
},

emptyTitle: {
  fontSize: 18,
  fontWeight: "800",
  color: "#1D2433",
  textAlign: "center",
  marginBottom: 8,
},

emptyText: {
  fontSize: 14,
  fontWeight: "600",
  color: "#6B7280",
  textAlign: "center",
  lineHeight: 20,
},
loadingBox: {
  flex: 1,
  alignItems: "center",
  justifyContent: "center",
  paddingTop: 40,
},

loadingText: {
  marginTop: 12,
  fontSize: 14,
  fontWeight: "700",
  color: "#5E6470",
},
});