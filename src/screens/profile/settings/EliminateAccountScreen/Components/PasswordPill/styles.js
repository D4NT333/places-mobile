import { StyleSheet } from "react-native";

export default StyleSheet.create({
  wrapper: {
    gap: 6,
  },
  label: {
    fontSize: 13,
    fontWeight: "600",
    color: "#111",
  },
  inputRow: {
    height: 44,
    borderWidth: 1.5,
    borderColor: "#111",
    borderRadius: 22,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    paddingRight: 10,
    fontSize: 14,
    color: "#111",
  },
  eye: {
    fontSize: 16,
    color: "#111",
  },
});
