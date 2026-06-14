import { StyleSheet } from "react-native";

export default StyleSheet.create({
  button: {
    minHeight: 52,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    columnGap: 9,
    borderRadius: 14,
    backgroundColor: "#17191E",
    paddingHorizontal: 20,
    marginBottom: 20,
  },

  buttonPressed: {
    opacity: 0.82,
    transform: [{ scale: 0.99 }],
  },

  buttonDisabled: {
    backgroundColor: "#B8BDC5",
  },

  text: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
  },
});