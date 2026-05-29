import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  card: {
    width: "48%",
    minHeight: 118,
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    padding: 16,
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 12,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    elevation: 3,
  },

  value: {
    fontSize: 28,
    fontWeight: "900",
    color: "#111827",
  },

  label: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: "800",
    color: "#374151",
  },

  helper: {
    marginTop: 4,
    fontSize: 12,
    color: "#6B7280",
  },
});

export default styles;