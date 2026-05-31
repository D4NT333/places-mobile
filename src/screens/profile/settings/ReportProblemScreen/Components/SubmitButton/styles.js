import { StyleSheet } from "react-native";

export default StyleSheet.create({
  button: {
    marginTop: 34,
    alignSelf: "flex-end",
    minWidth: 150,
    height: 48,
    paddingHorizontal: 26,
    borderRadius: 999,
    borderWidth: 2,
    borderColor: "#111111",
    backgroundColor: "#050505",
    alignItems: "center",
    justifyContent: "center",
  },

  buttonDisabled: {
    backgroundColor: "#FFFFFF",
    borderColor: "#BDBDBD",
  },

  buttonPressed: {
    opacity: 0.78,
    transform: [{ scale: 0.98 }],
  },

  text: {
    fontSize: 22,
    fontWeight: "800",
    color: "#FFFFFF",
  },

  textDisabled: {
    color: "#A0A0A0",
  },
});