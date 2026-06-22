import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },

  headerContainer: {
    marginBottom: 20,
  },

  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  backButton: {
    width: 34,
    height: 34,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 17,
  },

  flecha: {
    width: 24,
    height: 24,
  },

  title: {
    flex: 1,
    fontSize: 24,
    fontWeight: "800",
    color: "#111827",
    letterSpacing: -0.6,
  },

  helperText: {
    marginTop: 8,
    marginLeft: 46,
    fontSize: 14,
    lineHeight: 21,
    color: "#6B7280",
    fontWeight: "500",
  },

  scrollContent: {
    paddingBottom: 120,
    gap: 16,
  },

  centerState: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },

  centerStateText: {
    fontSize: 15,
    color: "#6B7280",
    fontWeight: "600",
  },

  emptyState: {
    marginTop: 32,
    padding: 22,
    borderRadius: 24,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },

  emptyTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#111827",
    marginBottom: 8,
  },

  emptyText: {
    fontSize: 15,
    lineHeight: 22,
    color: "#6B7280",
    fontWeight: "500",
  },

  loadingMore: {
    paddingVertical: 18,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },

  loadingMoreText: {
    fontSize: 14,
    color: "#6B7280",
    fontWeight: "600",
  },
});

export default styles;