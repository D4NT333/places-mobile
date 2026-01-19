import { StyleSheet } from "react-native";

export default StyleSheet.create({
  box: {
    borderWidth: 2,
    borderColor: "#111",
    borderRadius: 12,
    height: 220,
    padding: 12,
    backgroundColor: "#FFF",
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: "#111",
  },

  metaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 6,
  },
  hint: {
    fontSize: 12,
    color: "#666",
  },
  counter: {
    fontSize: 12,
    color: "#666",
    fontWeight: "600",
  },
});
