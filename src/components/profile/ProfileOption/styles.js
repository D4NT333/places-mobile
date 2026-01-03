import { StyleSheet } from "react-native";

export default StyleSheet.create({
  row: {
    paddingHorizontal: 16,
    paddingVertical: 18,
    justifyContent: "center",
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
  },
  right: {
    position: "absolute",
    right: 16,
    top: 0,
    bottom: 0,
    justifyContent: "center",
  },
  icon: {
    fontSize: 18,
  },
  line: {
    position: "absolute",
    left: 16,
    right: 16,
    bottom: 0,
    height: 2,
    backgroundColor: "#111",
  },
});