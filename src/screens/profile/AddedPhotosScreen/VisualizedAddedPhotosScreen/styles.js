import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,

    paddingHorizontal: 16,
    paddingTop: 10,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",

    gap: 10,

    marginBottom: 18,
  },

  closeButton: {
    width: 42,
    height: 42,

    justifyContent: "center",
    alignItems: "center",
  },

  closeButtonPressed: {
    opacity: 0.55,
  },

  closeButtonText: {
    fontSize: 34,
    lineHeight: 34,
    fontWeight: "400",
    color: "#111827",
  },

  headerTitle: {
    flex: 1,

    fontSize: 22,
    fontWeight: "700",
    color: "#111827",
  },

  content: {
    gap: 18,

    paddingBottom: 30,
  },

  centerContainer: {
    flex: 1,

    justifyContent: "center",
    alignItems: "center",

    gap: 14,

    paddingHorizontal: 24,
    paddingBottom: 80,
  },

  loadingText: {
    fontSize: 14,
    color: "#6B7280",
  },

  errorText: {
    textAlign: "center",

    fontSize: 14,
    lineHeight: 21,
    color: "#4B5563",
  },

  retryButton: {
    paddingHorizontal: 18,
    paddingVertical: 10,

    backgroundColor: "#FFFFFF",

    borderWidth: 1,
    borderColor: "#9CA3AF",
    borderRadius: 20,
  },

  retryButtonPressed: {
    opacity: 0.65,
  },

  retryButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#374151",
  },
});

export default styles;