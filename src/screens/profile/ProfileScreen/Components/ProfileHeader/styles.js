import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    width: "100%",
    minHeight: 110,
    flexDirection: "row",
    alignItems: "flex-start",
  },

  info: {
    flex: 1,
    marginLeft: 18,
    paddingTop: 28,
  },

  name: {
    fontSize: 16,
    fontWeight: "700",
    color: "#222222",
  },

  bellButton: {
    paddingTop: 10,
    paddingHorizontal: 4,
  },

  bellIcon: {
    width: 34,
    height: 34,
    tintColor: "#000000",
  },
});