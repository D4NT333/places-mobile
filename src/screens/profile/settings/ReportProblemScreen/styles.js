import { StyleSheet } from "react-native";

export default StyleSheet.create({
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
    width: 22,
    height: 22,
    resizeMode: "contain",
    tintColor: "#111111",
  },

  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 24,
    fontWeight: "800",
    color: "#111111",
  },

  headerSpacer: {
    width: 38,
    height: 38,
  },

  content: {
    marginTop: 18,
  },

  subtitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#555555",
    marginBottom: 10,
  },

  sectionTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: "#2A2A2A",
    marginBottom: 10,
  },

  reasonTitle: {
    marginTop: 22,
  },

  messageTitle: {
    marginTop: 24,
  },

  keyboardView: {
  flex: 1,
},

keyboardBottomSpace: {
  height: 140,
},
});