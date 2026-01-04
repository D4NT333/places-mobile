import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  row: {
    paddingVertical: 12,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#111",
  },
  rowLast: { borderBottomWidth: 0 },
  rowPressed: { opacity: 0.75 },
  rowText: { flex: 1, fontSize: 15, fontWeight: "500" },
  rowTextDanger: { color: "#C1121F", fontWeight: "700" },
  chevron: { fontSize: 22, opacity: 0.6 },
});

export default styles;