import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 16,
    alignItems: "center",
  },
  info: {
    flex: 1,
    paddingLeft: 12,
  },
  title: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 4,
  },
  name: {
    fontSize: 13,
    fontWeight: "500",
    marginBottom: 10,
  },
  desc: {
    fontSize: 12,
    opacity: 0.8,
  },
  editBtn: {
    position: "absolute",
    top: 10,
    right: 10,
    padding: 6,
  },
  editIcon: {
    fontSize: 16,
  },
});