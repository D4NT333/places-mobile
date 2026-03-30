import { StyleSheet } from "react-native";

export default StyleSheet.create({
  row: { flexDirection: "row", alignItems: "center", gap: 8 },
  starBtn: { padding: 2 },
  star: { fontSize: 22, opacity: 0.25 },
  starActive: { opacity: 1 },
  resetBtn: {
    marginLeft: 10,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.15)",
  },
  resetTxt: { fontWeight: "800", fontSize: 12 },
});
