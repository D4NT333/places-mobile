import { StyleSheet } from "react-native";

export default StyleSheet.create({
  wrap: {
    flexDirection: "row",
    gap: 10,
  },
  pill: {
    flex: 1,
    height: 36,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
  },
  pillActive: {
    backgroundColor: "#111",
    borderColor: "#111",
  },
  pillInactive: {
    backgroundColor: "#F3F4F6",
    borderColor: "#E5E7EB",
  },
  pillText: {
    fontSize: 13,
    fontWeight: "600",
  },
  textActive: {
    color: "#ffffffff",
  },
  textInactive: {
    color: "#111",
  },
});
