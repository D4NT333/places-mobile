import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
    paddingVertical: 2,
  },

  box: {
    width: 26,
    height: 26,
    borderRadius: 7,
    borderWidth: 1.5,
    borderColor: "#111111",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    marginTop: 1,
  },

  boxChecked: {
    backgroundColor: "#111111",
  },

  check: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "900",
    lineHeight: 20,
  },

  label: {
    flex: 1,
    fontSize: 15,
    fontWeight: "700",
    color: "#333333",
    lineHeight: 21,
  },
});