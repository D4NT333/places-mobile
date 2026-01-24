import { StyleSheet } from "react-native";

export default StyleSheet.create({
  btn: {
    height: 44,
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
  iconCircle: {
    width: 26,
    height: 26,
    borderRadius: 999,
    borderWidth: 2,
    borderColor: "#111",
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    fontWeight: "800",
    color: "#111",
  },
  text: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111",
  },
});
