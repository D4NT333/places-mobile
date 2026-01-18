import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingTop: 40,
    padding: 16,
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  info: {
    flexShrink: 1,
    paddingLeft: 16,
  },
  title: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 11,
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
     width: 40,
     height: 40,
     resizeMode: "contain",
     marginRight: 1,
  },
  editIcon: {
    fontSize: 16,
  },
});