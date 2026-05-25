import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  card: {
    minHeight: 74,
    borderRadius: 26,
    backgroundColor: "#FFFFFF",

    flexDirection: "row",
    alignItems: "center",

    paddingHorizontal: 18,
    paddingVertical: 14,

    borderWidth: 1,
    borderColor: "#DADDE3",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.12,
    shadowRadius: 5,
    elevation: 3,
  },

  avatar: {
    width: 58,
    height: 58,
    borderRadius: 29,
    borderWidth: 2,
    borderColor: "#111827",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },

  avatarText: {
    fontSize: 24,
    fontWeight: "900",
    color: "#111827",
  },

  info: {
    flex: 1,
    marginRight: 8,
  },

  name: {
    fontSize: 18,
    fontWeight: "900",
    color: "#111827",
  },

  distance: {
    marginTop: 3,
    fontSize: 15,
    fontWeight: "700",
    color: "#6B7280",
  },

  ratingBox: {
    width: 74,
    alignItems: "flex-end",
    justifyContent: "center",
  },

  ratingText: {
    fontSize: 19,
    fontWeight: "900",
    color: "#111827",
    marginBottom: 4,
  },
});

export default styles;