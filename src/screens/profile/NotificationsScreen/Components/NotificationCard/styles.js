import { StyleSheet } from "react-native";

export default StyleSheet.create({
  card: {
    width: "100%",
    borderWidth: 1.7,
    borderColor: "#5E6872",
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 8,
    marginBottom: 24,
    backgroundColor: "#FFFFFF",
  },

  cardUnread: {
    borderColor: "#222222",
  },

  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },

  unreadDot: {
    width: 7,
    height: 7,
    borderRadius: 999,
    backgroundColor: "#111111",
    marginRight: 6,
  },

  title: {
    flex: 1,
    fontSize: 15,
    fontWeight: "700",
    color: "#2C2C2C",
  },

  titleUnread: {
    fontWeight: "800",
  },

  message: {
    marginTop: 2,
    fontSize: 11.5,
    lineHeight: 15,
    color: "#333333",
  },

  footerRow: {
    marginTop: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  time: {
    fontSize: 13,
    fontWeight: "700",
    color: "#2C2C2C",
  },

  action: {
    fontSize: 12,
    fontWeight: "800",
    color: "#333333",
  },
});