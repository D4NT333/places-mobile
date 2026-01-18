import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    height: 280,
    backgroundColor: "#590bebff",
  },
  image: {
    height: 280,
    resizeMode: "cover",
  },
  topBar: {
    position: "absolute",
    top: 14,
    left: 12,
    right: 12,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  iconBtn: {
    width: 40,
    height: 40,
    borderRadius: 999,
    backgroundColor: "rgba(255, 36, 208, 0.45)",
    alignItems: "center",
    justifyContent: "center",
  },
  iconText: {
    color: "#fff",
    fontSize: 22,
    marginTop: -2,
  },
  dots: {
    position: "absolute",
    bottom: 10,
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    gap: 7,
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 99,
    backgroundColor: "rgba(255,255,255,0.45)",
  },
  dotActive: {
    backgroundColor: "rgba(255,255,255,0.95)",
  },
});
