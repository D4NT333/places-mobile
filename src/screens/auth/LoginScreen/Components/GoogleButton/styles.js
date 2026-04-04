import { StyleSheet } from "react-native";

export default StyleSheet.create({
  btn: {
    height: 46,
    borderRadius: 999,
    borderWidth: 2,
    borderColor: "#111",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 10,
    backgroundColor: "#FFF",
  },
  pressed: {
    transform: [{ scale: 0.99 }],
    opacity: 0.92,
  },
  icon: {
    width: 24,
    height: 24,
    resizeMode: "contain",
    right: 10,
  },
  text: {
    fontSize: 14,
    right: 8,
    fontWeight: "800",
    color: "#111",
  },
});
