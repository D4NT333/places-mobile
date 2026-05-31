import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    width: "100%",
  },

  label: {
    fontSize: 15,
    fontWeight: "900",
    color: "#111111",
    marginBottom: 8,
  },

  inputWrapper: {
    minHeight: 48,
    borderWidth: 1.5,
    borderColor: "#111111",
    borderRadius: 999,
    paddingLeft: 16,
    paddingRight: 8,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },

  input: {
    flex: 1,
    fontSize: 15,
    fontWeight: "600",
    color: "#111111",
    paddingVertical: 0,
  },

  eyeButton: {
    width: 38,
    height: 38,
    alignItems: "center",
    justifyContent: "center",
  },

  eyeIcon: {
    width: 23,
    height: 23,
    resizeMode: "contain",
  },
});