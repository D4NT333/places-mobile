import { StyleSheet } from "react-native";

export default StyleSheet.create({
  screen: {
    flex: 1,
  },

  header: {
    gap: 14,
    paddingTop: 4,
    paddingBottom: 14,
  },

  title: {
    fontSize: 30,
    fontWeight: "900",
    color: "#111827",
    letterSpacing: -0.6,
  },

  subtitle: {
    marginTop: 3,
    fontSize: 14,
    fontWeight: "600",
    color: "#6B7280",
  },

  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  searchBox: {
    flex: 1,
    height: 48,
    borderRadius: 18,
    paddingHorizontal: 16,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    justifyContent: "center",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 2,
  },

  searchText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#6B7280",
  },

  filterButton: {
    height: 48,
    paddingHorizontal: 16,
    borderRadius: 18,
    backgroundColor: "#0F766E",
    justifyContent: "center",
    alignItems: "center",

    shadowColor: "#0F766E",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.18,
    shadowRadius: 10,
    elevation: 3,
  },

  filterButtonText: {
    fontSize: 14,
    fontWeight: "900",
    color: "#FFFFFF",
  },

  selectedFiltersScroll: {
    marginHorizontal: -16,
  },

  selectedFiltersContent: {
    paddingHorizontal: 16,
    gap: 8,
  },

  selectedChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    paddingVertical: 9,
    paddingHorizontal: 13,
    borderRadius: 999,
    backgroundColor: "#E6FFFA",
    borderWidth: 1,
    borderColor: "#99F6E4",
  },

  selectedChipText: {
    fontSize: 13,
    fontWeight: "900",
    color: "#115E59",
  },

  selectedChipClose: {
    fontSize: 13,
    fontWeight: "900",
    color: "#115E59",
  },

  quickFiltersScroll: {
    marginHorizontal: -16,
  },

  quickFiltersContent: {
    paddingHorizontal: 16,
    gap: 8,
  },

  quickChip: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 999,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },

  quickChipActive: {
    backgroundColor: "#0F766E",
    borderColor: "#0F766E",
  },

  quickChipText: {
    fontSize: 13,
    fontWeight: "900",
    color: "#374151",
  },

  quickChipTextActive: {
    color: "#FFFFFF",
  },

  listContent: {
    paddingTop: 6,
    paddingBottom: 120,
  },

  columnWrapper: {
    justifyContent: "space-between",
    gap: 12,
  },

  placeCardButton: {
    width: "48%",
  },

  loader: {
    paddingVertical: 22,
  },
});