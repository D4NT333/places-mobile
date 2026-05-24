import { StyleSheet } from "react-native";

export default StyleSheet.create({
  card: {
    minHeight: 82,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: "#D1D5DB",
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingLeft: 10,
    paddingRight: 16,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },

  photoCircle: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: "#F3F4F6",
    borderWidth: 1.5,
    borderColor: "#111827",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },

  photoInitial: {
    fontSize: 22,
    fontWeight: "900",
    color: "#111827",
  },

  info: {
    flex: 1,
    justifyContent: "center",
  },

  name: {
    fontSize: 17,
    fontWeight: "900",
    color: "#111827",
    marginBottom: 2,
  },

  distance: {
    fontSize: 13,
    fontWeight: "700",
    color: "#6B7280",
  },

  ratingBox: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
  },

  ratingText: {
    fontSize: 17,
    fontWeight: "900",
    color: "#111827",
    marginRight: 6,
  },

  starIcon: {
    width: 28,
    height: 28,
    resizeMode: "contain",
  },
});