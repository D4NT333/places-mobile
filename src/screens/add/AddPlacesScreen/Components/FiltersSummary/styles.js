import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    backgroundColor: "#F2F2F2",
    borderRadius: 18,
    padding: 14,
    gap: 10,
    borderWidth: 1,
    borderColor: "#E2E2E2",
    },

  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
  },

  title: {
    fontSize: 16,
    fontWeight: "800",
    color: "#111",
    flex: 1,
  },

  editText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#555",
  },

  chipsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },

  chip: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 999,
    backgroundColor: "#111",
  },

  chipText: {
    color: "#FFF",
    fontSize: 12,
    fontWeight: "700",
  },

  chipSecondary: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 999,
    backgroundColor: "#E3E3E3",
  },

  chipSecondaryText: {
    color: "#333",
    fontSize: 12,
    fontWeight: "700",
  },

  priceText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#444",
  },
  scheduleText: {
  marginTop: 8,
  fontSize: 15,
  fontWeight: "800",
  color: "#333",
},
});