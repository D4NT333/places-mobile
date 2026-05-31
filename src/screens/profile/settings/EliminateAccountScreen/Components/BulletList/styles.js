import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    gap: 10,
  },

  row: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
  },

  dot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: "#111111",
    marginTop: 8,
  },

  text: {
    flex: 1,
    fontSize: 15,
    fontWeight: "700",
    color: "#222222",
    lineHeight: 22,
  },
});