import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    marginTop: 14,
    gap: 10,
    paddingHorizontal: 6,
  },
  row: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#111",
    marginTop: 4,
  },
  text: {
    flex: 1,
    fontSize: 12,
    color: "#111",
    lineHeight: 16,
  },
});
