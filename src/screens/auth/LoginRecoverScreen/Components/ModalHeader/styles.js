import { StyleSheet } from "react-native";

export default StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  closeBtn: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  pressed: { opacity: 0.7, transform: [{ scale: 0.98 }] },
  closeText: { fontSize: 16, fontWeight: "800", color: "#111" },
  title: { fontSize: 16, fontWeight: "800", color: "#111" },
});
