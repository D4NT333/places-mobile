import { StyleSheet } from "react-native";

export default StyleSheet.create({
  row: {
    flexDirection: "row",
    gap: 12,
    marginTop: 6,
  },

  btn: {
    flex: 1,
    height: 44,
    borderRadius: 999,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
  },

  btnGhost: {
    backgroundColor: "#FFF",
    borderColor: "#E5E7EB",
  },

  btnPrimary: {
    backgroundColor: "#000000",
    borderColor: "#000000",
  },

  btnText: {
    fontSize: 14,
    fontWeight: "800",
  },

  textGhost: {
    color: "#111",
  },

  textPrimary: {
    color: "#FFF",
  },

  submitButtonDisabled: {
    backgroundColor: "#9CA3AF",
    borderColor: "#9CA3AF",
  },

  submitTextDisabled: {
    color: "#F3F4F6",
  },
});