import { StyleSheet } from "react-native";

export default StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 16,
  },

  closeButton: {
    width: 36,
    alignItems: "center",
    justifyContent: "center",
  },

  closeText: {
    fontSize: 26,
    fontWeight: "800",
    color: "#4B5563",
  },

  title: {
    flex: 1,
    textAlign: "center",
    fontSize: 22,
    fontWeight: "900",
    color: "#374151",
  },

  fakeSpace: {
    width: 36,
  },
});