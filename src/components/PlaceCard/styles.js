import { StyleSheet } from "react-native";

export default StyleSheet.create({
  card: {
    width: "100%",
    borderRadius: 14,
    backgroundColor: "#FFFFFF",
    borderWidth: 1.8,
    borderColor: "#111827",
    overflow: "hidden",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },

  tallCard: {
    height: 330,
  },

  shortCard: {
    height: 270,
  },

  placeImage: {
    width: "100%",
    resizeMode: "cover",
    borderBottomWidth: 1.6,
    borderBottomColor: "#111827",
  },

  imagePlaceholder: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 1.6,
    borderBottomColor: "#111827",
  },

  imagePlaceholderText: {
    fontSize: 26,
    fontWeight: "400",
    color: "#111827",
  },

  tallImage: {
    height: 235,
  },

  shortImage: {
    height: 185,
  },

  infoBox: {
    flex: 1,
    paddingHorizontal: 6,
    paddingTop: 5,
    paddingBottom: 6,
  },

  title: {
    fontSize: 12,
    fontWeight: "800",
    color: "#374151",
    lineHeight: 14,
    marginBottom: 4,
  },

  tagsRow: {
    flexDirection: "row",
    flexWrap: "nowrap",
    gap: 3,
    marginBottom: 2,
  },

  tag: {
    flex: 1,
    height: 18,
    paddingHorizontal: 3,
    borderRadius: 999,
    borderWidth: 1.2,
    borderColor: "#111827",
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },

  tagText: {
    fontSize: 6.5,
    fontWeight: "800",
    color: "#374151",
  },

  ratingNumber: {
    alignSelf: "flex-end",
    fontSize: 14,
    fontWeight: "900",
    color: "#374151",
    marginTop: 0,
    marginRight: 2,
    lineHeight: 16,
  },

  bottomRow: {
    marginTop: "auto",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 4,
  },

  distance: {
    flex: 1,
    fontSize: 12,
    fontWeight: "800",
    color: "#6B7280",
  },
});