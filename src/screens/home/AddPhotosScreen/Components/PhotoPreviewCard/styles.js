import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    width: "48.3%",
    aspectRatio: 1,
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: "#E4E7EB",
  },

  image: {
    width: "100%",
    height: "100%",
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.08)",
  },

  positionBadge: {
    position: "absolute",
    left: 9,
    bottom: 9,
    minWidth: 27,
    height: 27,
    paddingHorizontal: 8,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.68)",
  },

  positionText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "700",
  },

  removeButton: {
    position: "absolute",
    top: 9,
    right: 9,
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(15, 16, 18, 0.76)",
  },

  removeButtonPressed: {
    opacity: 0.65,
  },
});