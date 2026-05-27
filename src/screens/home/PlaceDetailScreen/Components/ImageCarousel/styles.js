import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    marginBottom: 18,
  },

  carouselBox: {
  height: 230,
  borderRadius: 22,
  overflow: "hidden",
  backgroundColor: "#E9EDF2",
},

  slide: {
    height: "100%",
  },

  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },

  viewAllPill: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "rgba(255,255,255,0.85)",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
  },

  viewAllText: {
    fontSize: 12,
    fontWeight: "800",
    color: "#111111",
  },

  counterPill: {
    position: "absolute",
    left: 10,
    bottom: 10,
    backgroundColor: "rgba(255,255,255,0.85)",
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: 999,
  },

  counterText: {
    fontSize: 12,
    fontWeight: "800",
    color: "#111111",
  },

  dotsContainer: {
    position: "absolute",
    bottom: 14,
    alignSelf: "center",
    flexDirection: "row",
    gap: 7,
    backgroundColor: "rgba(255,255,255,0.55)",
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 999,
  },

  dot: {
    width: 7,
    height: 7,
    borderRadius: 99,
    backgroundColor: "rgba(0,0,0,0.25)",
  },

  activeDot: {
    width: 18,
    backgroundColor: "#111111",
  },

  addPhotosButton: {
    alignSelf: "flex-start",
    marginTop: 10,
    height: 34,
    paddingHorizontal: 18,
    borderRadius: 999,
    backgroundColor: "#111111",
    alignItems: "center",
    justifyContent: "center",
  },

  addPhotosText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "800",
  },
});