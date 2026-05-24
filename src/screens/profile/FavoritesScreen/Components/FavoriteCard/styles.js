import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  card: {
    width: "100%",
    minHeight: 92,
    flexDirection: "row",
    alignItems: "center",

    paddingVertical: 12,
    paddingHorizontal: 14,

    backgroundColor: "#FFFFFF",
    borderWidth: 1.5,
    borderColor: "#D9DEE7",
    borderRadius: 10,
  },

  imageBox: {
    width: 64,
    height: 64,
    borderRadius: 32,

    alignItems: "center",
    justifyContent: "center",

    borderWidth: 1.5,
    borderColor: "#D9DEE7",
    backgroundColor: "#FFFFFF",

    marginRight: 14,
  },

  image: {
    width: "100%",
    height: "100%",
    borderRadius: 32,
    resizeMode: "cover",
  },

  imageText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#7B7B7B",
  },

  info: {
    flex: 1,
    justifyContent: "center",
    paddingRight: 8,
  },

  name: {
    fontSize: 17,
    fontWeight: "800",
    color: "#1A1A1A",
    marginBottom: 6,
  },

  tagsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 5,
  },

  chip: {
    maxWidth: 92,
    paddingHorizontal: 8,
    paddingVertical: 2,

    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#BFC5CE",
    backgroundColor: "#F8F9FB",
  },

  chipText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#555B65",
  },

  rating: {
    fontSize: 13,
    fontWeight: "700",
    color: "#5E5E5E",
  },

  heartButton: {
    width: 46,
    height: 46,
    alignItems: "center",
    justifyContent: "center",
  },

  heartIcon: {
    width: 34,
    height: 34,
    resizeMode: "contain",
  },
});

export default styles;