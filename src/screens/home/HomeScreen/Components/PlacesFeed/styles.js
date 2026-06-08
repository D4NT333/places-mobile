import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
  },

  list: {
    flex: 1,
  },

  content: {
    paddingHorizontal: 16,
    paddingTop: 0,
    paddingBottom: 130,
  },

  grid: {
    flexDirection: "row",
    gap: 14,
    alignItems: "flex-start",
  },

  column: {
    flex: 1,
    gap: 14,
  },

  cardButton: {
    width: "100%",
  },

  loader: {
    paddingVertical: 24,
    alignItems: "center",
    justifyContent: "center",
  },
});