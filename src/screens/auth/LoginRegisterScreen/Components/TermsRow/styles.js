import { StyleSheet } from "react-native";

export default StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
    paddingTop: 2,
  },
  pressed: {
    opacity: 0.8,
  },
  box: {
    width: 18,
    height: 18,
    borderWidth: 2,
    borderColor: "#111",
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 2,
  },
  boxChecked: {
    backgroundColor: "#DADFE6",
  },
  check: {
    fontSize: 12,
    fontWeight: "900",
    color: "#111",
  },
  text: {
    flex: 1,
    fontSize: 11.5,
    color: "#444",
    lineHeight: 16,
  },
  link: {
    color: "#111",
    fontWeight: "700",
    textDecorationLine: "underline",
  },
});
