import { StyleSheet } from "react-native";

export default StyleSheet.create({
  block: {
    width: "100%",
  },

  wrap: {
    borderWidth: 2,
    borderColor: "#111",
    borderRadius: 999,
    paddingHorizontal: 28,
    height: 46,
    justifyContent: "center",
    top: 6,
    position: "relative",
    backgroundColor: "#FFFFFF",
  },

  wrapTouchable: {
    flexDirection: "row",
    alignItems: "center",
  },

  wrapError: {
    borderColor: "#D93636",
  },

  input: {
    flex: 1,
    height: 46,
    fontSize: 14,
    color: "#000000",
    opacity: 1,
    paddingVertical: 0,
    paddingHorizontal: 0,
    includeFontPadding: false,
  },

  inputPassword: {
    paddingRight: 44,
    color: "#000000",
    opacity: 1,
  },

  placeholderText: {
    color: "#666",
  },

  hint: {
    fontSize: 14,
    color: "#666",
    marginLeft: 8,
  },

  eyeButton: {
    position: "absolute",
    right: 10,
    top: 0,
    bottom: 0,
    width: 40,
    alignItems: "center",
    justifyContent: "center",
  },

  eyeIcon: {
    width: 28,
    height: 28,
    resizeMode: "contain",
    tintColor: "#111111",
  },

  error: {
    marginTop: 10,
    marginLeft: 18,
    fontSize: 13,
    color: "#D93636",
  },

  helper: {
    marginTop: 10,
    marginLeft: 18,
    fontSize: 13,
    color: "#666",
  },
});