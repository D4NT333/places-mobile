import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  scrollContent: {
    padding: 16,
    paddingBottom: 28,
    gap: 18,
  },

  headerRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 12,
  },

  closeButton: {
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
  },

  closeButtonText: {
    fontSize: 20,
    fontWeight: "600",
  },

  headerInfo: {
    flex: 1,
    gap: 4,
  },

  placeName: {
    fontSize: 18,
    fontWeight: "700",
  },

  submittedAt: {
    fontSize: 13,
    color: "#555",
  },

  headerRight: {
    alignItems: "flex-end",
    gap: 10,
  },

  statusText: {
    fontSize: 14,
    fontWeight: "600",
  },

  editButton: {
    minWidth: 84,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderWidth: 1.5,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
  },

  editButtonText: {
    fontSize: 14,
    fontWeight: "600",
  },

  section: {
    gap: 10,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
  },

  cardBox: {
    minHeight: 96,
    borderWidth: 1.5,
    borderRadius: 12,
    padding: 12,
    justifyContent: "center",
  },

  smallBox: {
    minHeight: 52,
    borderWidth: 1.5,
    borderRadius: 12,
    paddingHorizontal: 12,
    justifyContent: "center",
  },

  mapBox: {
    height: 160,
    borderWidth: 1.5,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },

  mapPlaceholderText: {
    fontSize: 14,
    color: "#666",
  },

  bodyText: {
    fontSize: 14,
    lineHeight: 20,
  },

  tagsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },

  tagChip: {
    borderWidth: 1.5,
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },

  tagChipText: {
    fontSize: 13,
    fontWeight: "500",
  },
});

export default styles;