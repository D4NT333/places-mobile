import { StyleSheet } from "react-native";

export default StyleSheet.create({
  row: {
    paddingHorizontal: 14,
    paddingVertical: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  rowDivider: {
    borderBottomWidth: 1,
    borderBottomColor: "#EFEFEF",
  },
  label: {
    flex: 1,
    paddingRight: 12,
    fontSize: 14,
    color: "#111",
    fontWeight: "600",
  },
});
