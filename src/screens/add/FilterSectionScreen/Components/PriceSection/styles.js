import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    marginTop: 20,
  },

  title: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 10,
  },

  freeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 10,
  },

  box: {
    width: 20,
    height: 20,
    borderWidth: 1.5,
    borderColor: "#111",
  },

  boxActive: {
    backgroundColor: "#111",
  },

  freeText: {
    fontWeight: "700",
  },

  labels: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
});