import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#EEF0F4",
  },

  numberBadge: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#111827",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  numberText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "900",
  },

  content: {
    flex: 1,
  },

  name: {
    fontSize: 14,
    fontWeight: "900",
    color: "#111827",
  },

  meta: {
    marginTop: 3,
    fontSize: 12,
    color: "#6B7280",
  },

  visits: {
    minWidth: 28,
    textAlign: "right",
    fontSize: 14,
    fontWeight: "900",
    color: "#538DE4",
  },
});

export default styles;