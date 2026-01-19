import { StyleSheet } from "react-native";

export default StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingVertical: 8,
  },
  box: {
    width: 18,
    height: 18,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: "#111",
    alignItems: "center",
    justifyContent: "center",
  },
  boxChecked: {
    backgroundColor: "#111",
  },
  check: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "800",
    marginTop: -1,
  },
  label: {
    flex: 1,
    fontSize: 12,
    color: "#111",
  },
});
