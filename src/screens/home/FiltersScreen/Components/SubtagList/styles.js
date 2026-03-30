import { StyleSheet } from "react-native";

export default StyleSheet.create({
  wrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  pill: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.15)",
  },
  pillActive: {
    backgroundColor: "rgba(0,0,0,0.10)",
    borderColor: "rgba(0,0,0,0.28)",
  },
  txt: { fontWeight: "700" },
  txtActive: { fontWeight: "900" },
});
