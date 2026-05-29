import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    width: "100%",
  },

  input: {
    minHeight: 170,
    borderWidth: 2,
    borderColor: "#202124",
    borderRadius: 18,
    paddingHorizontal: 18,
    paddingTop: 18,
    paddingBottom: 18,

    fontSize: 18,
    fontWeight: "700",
    color: "#202124",

    textAlign: "left",
    textAlignVertical: "top",
  },

  footerRow: {
    marginTop: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },

  helperText: {
    fontSize: 15,
    fontWeight: "500",
    color: "#7A818C",
  },

  counterText: {
    fontSize: 15,
    fontWeight: "800",
    color: "#3B4250",
  },
});