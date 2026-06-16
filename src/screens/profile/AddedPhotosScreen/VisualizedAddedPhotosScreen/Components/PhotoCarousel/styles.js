import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    aspectRatio: 1.65,

    overflow: "hidden",

    backgroundColor: "#E5E7EB",

    borderWidth: 1,
    borderColor: "#9CA3AF",
    borderRadius: 14,
  },

  image: {
    height: "100%",
  },

  counter: {
    position: "absolute",
    top: 12,
    right: 12,

    paddingHorizontal: 10,
    paddingVertical: 5,

    backgroundColor:
      "rgba(17, 24, 39, 0.72)",

    borderRadius: 14,
  },

  counterText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#FFFFFF",
  },

  dotsContainer: {
    position: "absolute",
    bottom: 10,
    left: 0,
    right: 0,

    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",

    gap: 6,
  },

  dot: {
    width: 7,
    height: 7,

    backgroundColor:
      "rgba(255, 255, 255, 0.65)",

    borderRadius: 4,
  },

  activeDot: {
    width: 18,

    backgroundColor: "#FFFFFF",
  },

  emptyContainer: {
    width: "100%",
    aspectRatio: 1.65,

    justifyContent: "center",
    alignItems: "center",

    gap: 5,
    paddingHorizontal: 24,

    backgroundColor: "#F3F4F6",

    borderWidth: 1,
    borderColor: "#9CA3AF",
    borderRadius: 14,
  },

  emptyTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#374151",
  },

  emptyText: {
    textAlign: "center",

    fontSize: 13,
    lineHeight: 19,
    color: "#6B7280",
  },
});

export default styles;