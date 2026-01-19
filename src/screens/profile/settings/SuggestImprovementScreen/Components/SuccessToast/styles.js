import { StyleSheet } from "react-native";

export default StyleSheet.create({
  overlay: {
    position: "absolute",
    left: 16,
    right: 16,
    bottom: 24,
    alignItems: "center",
  },
  toast: {
    borderWidth: 2,
    borderColor: "#111",
    borderRadius: 12,
    backgroundColor: "#FFF",
    paddingVertical: 12,
    paddingHorizontal: 14,
    width: "100%",
    maxWidth: 320,
  },
  text: {
    textAlign: "center",
    fontSize: 14,
    fontWeight: "700",
    color: "#111",
    lineHeight: 18,
  },
});
