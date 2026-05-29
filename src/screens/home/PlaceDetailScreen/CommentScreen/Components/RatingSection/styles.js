import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    alignItems: "center",
  },

  title: {
    fontSize: 28,
    fontWeight: "900",
    color: "#202124",
    marginBottom: 34,
    textAlign: "center",
  },

  labelsRow: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
    paddingHorizontal: 2,
  },

  scaleLabel: {
    flex: 1,
    fontSize: 12,
    fontWeight: "600",
    color: "#5F6673",
    textAlign: "center",
  },

  selectedText: {
    marginTop: 20,
    fontSize: 17,
    fontWeight: "800",
    color: "#202124",
    textAlign: "center",
  },
});