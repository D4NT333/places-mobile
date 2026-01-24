import { StyleSheet } from "react-native";

export default StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginTop: 2,
    marginBottom: 4,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#111",
    opacity: 0.45,
  },
  text: {
    fontSize: 12,
    color: "#444",
  },
});
