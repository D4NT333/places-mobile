import { StyleSheet } from "react-native";

export default StyleSheet.create({
  btn: {
    height: 46,
    borderRadius: 999,
    borderWidth: 2,
    borderColor: "#000000",
    backgroundColor: "#DADFE6",
    alignItems: "center",
    justifyContent: "center",
    top: 6,
  },
  btnPressed: {
    transform: [{ scale: 0.99 }],
    opacity: 0.92,
  },
  btnDisabled: {
    opacity: 0.55,
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111",
  },
  textDisabled: {
    color: "#333",
  },
});
