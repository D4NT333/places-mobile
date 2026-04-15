import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },

  topRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },

  closeButton: {
    width: 32,
    height: 32,
    alignItems: "flex-start",
    justifyContent: "center",
  },

  closeText: {
    fontSize: 28,
    lineHeight: 28,
    fontWeight: "500",
    color: "#2A2A2A",
  },

  title: {
    flex: 1,
    textAlign: "center",
    fontSize: 22,
    lineHeight: 28,
    fontWeight: "700",
    color: "#2A2A2A",
  },

  rightSpacer: {
    width: 32,
  },

  subtitle: {
    fontSize: 13,
    lineHeight: 18,
    color: "#6B7280",
    textAlign: "left",
  },
});

export default styles;