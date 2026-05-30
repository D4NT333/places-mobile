import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 14,
    marginTop: 18,
    marginBottom: 16,
  },

  pill: {
    minWidth: 92,
    height: 30,
    borderWidth: 1.7,
    borderColor: "#222",
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
  },

  pillActive: {
    backgroundColor: "#111111",
  },

  pillText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#222222",
  },

  pillTextActive: {
    color: "#FFFFFF",
  },
});