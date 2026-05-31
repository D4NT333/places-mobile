import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    width: "100%",
  },

  input: {
    minHeight: 220,
    borderWidth: 2,
    borderColor: "#111111",
    borderRadius: 18,
    paddingHorizontal: 18,
    paddingTop: 18,
    paddingBottom: 18,
    fontSize: 16,
    fontWeight: "500",
    color: "#111111",
    backgroundColor: "#FFFFFF",
  },

  footer: {
    marginTop: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  helperText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#777777",
  },

  helperTextValid: {
    color: "#333333",
  },

  counter: {
    fontSize: 14,
    fontWeight: "800",
    color: "#666666",
  },
});