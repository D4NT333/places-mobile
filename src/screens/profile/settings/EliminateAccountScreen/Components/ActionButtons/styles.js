import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    marginTop: 2,
    flexDirection: "row",
    gap: 12,
  },

  button: {
    flex: 1,
    minHeight: 48,
    borderRadius: 999,
    borderWidth: 1.5,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 12,
  },

  cancelButton: {
    borderColor: "#111111",
    backgroundColor: "#FFFFFF",
  },

  deleteButton: {
    borderColor: "#111111",
    backgroundColor: "#111111",
  },

  deleteButtonDisabled: {
    borderColor: "#C9C9C9",
    backgroundColor: "#FFFFFF",
  },

  pressed: {
    opacity: 0.75,
    transform: [{ scale: 0.98 }],
  },

  cancelText: {
    fontSize: 15,
    fontWeight: "900",
    color: "#111111",
  },

  deleteText: {
    fontSize: 15,
    fontWeight: "900",
    color: "#FFFFFF",
  },

  deleteTextDisabled: {
    color: "#A0A0A0",
  },
});