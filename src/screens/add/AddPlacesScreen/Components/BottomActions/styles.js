import { StyleSheet } from "react-native";

export default StyleSheet.create({
  row: {
    flexDirection: "row",
    gap: 12,
    marginTop: 2,
    marginBottom: 4,
  },

  btn: {
    flex: 1,
    height: 50,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
  },

  btnGhost: {
    backgroundColor: "#FFFFFF",
    borderColor: "#E5E7EB",
  },

btnPrimary: {
  backgroundColor: "#111827",
  borderColor: "#111827",

  shadowColor: "#111827",
  shadowOffset: {
    width: 0,
    height: 7,
  },
  shadowOpacity: 0.22,
  shadowRadius: 10,
  elevation: 4,
},

textPrimary: {
  color: "#FFFFFF",
},

  textGhost: {
    color: "#374151",
  },

  textPrimary: {
    color: "#FFFFFF",
  },

  submitButtonDisabled: {
  backgroundColor: "#D1D5DB",
  borderColor: "#D1D5DB",
  shadowOpacity: 0,
  elevation: 0,
},

submitTextDisabled: {
  color: "#F9FAFB",
},
});