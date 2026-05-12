import { StyleSheet } from "react-native";

export default StyleSheet.create({
  block: {
    gap: 6,
  },
  wrap: {
  minHeight: 58,
  borderWidth: 2,
  borderColor: "#111827",
  borderRadius: 28,
  flexDirection: "row",
  alignItems: "center",
  backgroundColor: "#FFFFFF",
  overflow: "hidden",
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
  color: "#111827",
  paddingLeft: 20,
  paddingRight: 6,
  paddingVertical: 0,
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
  rightIconButton: {
  width: 54,
  height: 58,
  alignItems: "center",
  justifyContent: "center",
  paddingRight: 16,
},

rightIcon: {
  width: 24,
  height: 24,
},
});
