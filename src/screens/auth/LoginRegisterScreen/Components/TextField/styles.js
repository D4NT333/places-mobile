import { StyleSheet } from "react-native";

export default StyleSheet.create({
  block: {
    gap: 6,
  },
  wrap: {
    borderWidth: 2,
    borderColor: "#111",
    borderRadius: 999,
    paddingHorizontal: 14,
    height: 44,
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
  },
  wrapTouchable: {
    opacity: 0.98,
  },
  wrapError: {
    borderColor: "#B00020",
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#111",
  },
  hint: {
    fontSize: 14,
    color: "#111",
    marginLeft: 8,
  },
  helper: {
    fontSize: 11.5,
    color: "#666",
    paddingLeft: 10,
    marginTop: -2,
  },
  error: {
    fontSize: 11.5,
    color: "#B00020",
    paddingLeft: 10,
    marginTop: -2,
    fontWeight: "600",
  },
});
