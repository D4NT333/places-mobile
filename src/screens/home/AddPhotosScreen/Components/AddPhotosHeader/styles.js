import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    minHeight: 70,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E8EAEF",
  },

  backButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: "center",
    justifyContent: "center",
  },

  backButtonPressed: {
    backgroundColor: "#F0F1F4",
  },

  textContainer: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 8,
  },

  title: {
    color: "#17191E",
    fontSize: 17,
    fontWeight: "700",
  },

  placeName: {
    maxWidth: "100%",
    color: "#7A818C",
    fontSize: 12,
    marginTop: 2,
  },

  rightPlaceholder: {
    width: 42,
    height: 42,
  },
});