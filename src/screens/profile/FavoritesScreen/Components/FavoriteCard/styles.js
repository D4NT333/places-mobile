import { StyleSheet } from "react-native";

export default StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: "#E7E7E7",
    borderRadius: 14,
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "#DCDCDC",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  avatarTxt: {
    fontSize: 11,
    color: "#777",
    fontWeight: "700",
  },
  info: {
    flex: 1,
    gap: 4,
  },
  name: {
    fontSize: 15,
    fontWeight: "700",
    color: "#111",
  },
  metaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
  meta: {
    fontSize: 12,
    color: "#666",
    fontWeight: "500",
  },
  heartBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 8,
  },
  heart: {
    fontSize: 18,
  },
});
