import { StyleSheet } from "react-native";

export default StyleSheet.create({
  btn: {
    height: 44,
    borderRadius: 999,
    borderWidth: 2,
    borderColor: "#111",
    backgroundColor: "#DADFE6",
    alignItems: "center",
    justifyContent: "center",
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
