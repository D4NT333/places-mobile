import { StyleSheet } from "react-native";

export default StyleSheet.create({
  row: {
    marginTop: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 14,
  },
  circle: {
    width: 92,
    height: 92,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#111",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  img: { width: "100%", height: "100%" },
  ph: { textAlign: "center", fontSize: 11, color: "#111", opacity: 0.9 },
  arrow: { fontSize: 18, fontWeight: "700", color: "#111" },
  pickBtn: {
    marginTop: 18,
    borderWidth: 1,
    borderColor: "#111",
    borderRadius: 999,
    paddingVertical: 12,
    alignItems: "center",
  },
  pickText: { fontSize: 14, fontWeight: "700", color: "#111" },
});
