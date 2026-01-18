import { StyleSheet } from "react-native";

export default StyleSheet.create({
  row: {
    paddingHorizontal: 16,
    paddingVertical: 26,
    justifyContent: "center",
  },
  label: {
    fontSize: 20,
    fontWeight: "600",
  },
  right: {
    position: "absolute",
    right: 12,
    top: 0,
    bottom: 0,
    justifyContent: "center",
  },
  icon: {
    width: 38,
    height: 38,
    marginRight: 1,
  },
  line: {
    position: "absolute",
    left: 16,
    right: 16,
    bottom: 0,
    height: 2,
    backgroundColor: "#000000ff",
  },
});