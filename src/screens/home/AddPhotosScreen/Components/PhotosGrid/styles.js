import { StyleSheet } from "react-native";

export default StyleSheet.create({
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: 12,
  },

  addCard: {
    width: "48.3%",
    aspectRatio: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 16,
    borderWidth: 1.5,
    borderStyle: "dashed",
    borderColor: "#88CDA1",
    backgroundColor: "#F2FBF5",
    padding: 12,
  },

  addCardPressed: {
    opacity: 0.72,
    transform: [{ scale: 0.985 }],
  },

  addCardDisabled: {
    opacity: 0.6,
  },

  addIconContainer: {
    width: 46,
    height: 46,
    borderRadius: 23,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#DCF4E4",
    marginBottom: 10,
  },

  addTitle: {
    color: "#176C3A",
    fontSize: 14,
    fontWeight: "700",
    textAlign: "center",
  },

  addDescription: {
    color: "#6E8E79",
    fontSize: 11,
    marginTop: 3,
  },
});