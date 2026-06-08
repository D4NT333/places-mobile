import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 4,
  },

  scroll: {
    flex: 1,
  },

  scrollContent: {
    alignItems: "center",
    gap: 8,
  },

  chip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingVertical: 9,
    paddingHorizontal: 12,
    borderRadius: 999,
    backgroundColor: "#F0FDFA",
    borderWidth: 1,
    borderColor: "#99F6E4",
  },

  chipText: {
    fontSize: 13,
    fontWeight: "800",
    color: "#115E59",
  },

  chipClose: {
    fontSize: 15,
    fontWeight: "900",
    color: "#115E59",
  },

  emptyChip: {
    paddingVertical: 9,
    paddingHorizontal: 12,
    borderRadius: 999,
    backgroundColor: "#F3F4F6",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },

  emptyChipText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#6B7280",
  },

  filterButton: {
    height: 42,
    paddingHorizontal: 15,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },

  filterButtonText: {
    fontSize: 14,
    fontWeight: "900",
    color: "#111827",
  },
});