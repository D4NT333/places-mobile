import { StyleSheet } from "react-native";

export default StyleSheet.create({
  wrap: {
    alignItems: "center",
    paddingVertical: 6,
  },
  circle: {
    width: 92,
    height: 92,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#111",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  img: { width: "100%", height: "100%" },
  placeholder: {
    textAlign: "center",
    fontSize: 11,
    color: "#111",
    opacity: 0.9,
  },
});
