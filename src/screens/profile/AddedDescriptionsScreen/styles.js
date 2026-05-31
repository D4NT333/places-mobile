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
});