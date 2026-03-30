import { StyleSheet } from "react-native";

export default StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: "#000000",
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },

  avatar: {
    width: 46,
    height: 46,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#000000",
    marginRight: 12,
    backgroundColor: "#F5F5F5",
  },

  info: {
    flex: 1,
    gap: 2,
  },

  name: {
    fontSize: 15,
    fontWeight: "700",
  },

  distance: {
    fontSize: 12,
    opacity: 0.7,
  },

  right: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginLeft: 12,
  },

  rating: {
    fontSize: 14,
    fontWeight: "700",
  },

  star: {
    fontSize: 16,
  },
});
