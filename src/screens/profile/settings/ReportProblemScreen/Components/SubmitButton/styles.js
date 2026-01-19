import { StyleSheet } from "react-native";

export default StyleSheet.create({
  btn: {
    alignSelf: "flex-end",
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 999,
    borderWidth: 2,
    borderColor: "#111",
    backgroundColor: "#FFF",
  },
  btnPressed: {
    transform: [{ scale: 0.98 }],
  },
  btnDisabled: {
    borderColor: "#BBB",
  },
  text: {
    fontSize: 13,
    fontWeight: "700",
    color: "#111",
  },
  textDisabled: {
    color: "#999",
  },
});
