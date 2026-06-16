import {
  StyleSheet,
} from "react-native";

const styles = StyleSheet.create({
  overlay: {
    flex: 1,

    justifyContent: "center",
    alignItems: "center",

    paddingHorizontal: 22,

    backgroundColor:
      "rgba(17, 24, 39, 0.55)",
  },

  modalCard: {
    width: "100%",
    maxWidth: 430,

    overflow: "hidden",

    backgroundColor: "#FFFFFF",

    borderRadius: 18,

    shadowColor: "#000000",

    shadowOffset: {
      width: 0,
      height: 12,
    },

    shadowOpacity: 0.22,
    shadowRadius: 24,

    elevation: 12,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    paddingHorizontal: 20,
    paddingVertical: 17,
  },

  title: {
    flex: 1,

    fontSize: 20,
    fontWeight: "700",
    color: "#1F2937",
  },

  closeIconButton: {
    width: 34,
    height: 34,

    justifyContent: "center",
    alignItems: "center",

    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 17,
  },

  closeIconText: {
    marginTop: -2,

    fontSize: 24,
    lineHeight: 25,
    fontWeight: "400",
    color: "#4B5563",
  },

  divider: {
    height: 1,

    backgroundColor: "#E5E7EB",
  },

  content: {
    minHeight: 140,

    alignItems: "flex-start",

    paddingHorizontal: 20,
    paddingVertical: 22,
  },

  centerContent: {
    flex: 1,
    width: "100%",

    justifyContent: "center",
    alignItems: "center",

    gap: 12,

    paddingVertical: 16,
  },

  loadingText: {
    fontSize: 14,
    color: "#6B7280",
  },

  errorText: {
    textAlign: "center",

    fontSize: 14,
    lineHeight: 21,
    color: "#B91C1C",
  },

  reasonChip: {
    alignSelf: "flex-start",

    paddingHorizontal: 13,
    paddingVertical: 7,

    backgroundColor: "#FEF2F2",

    borderWidth: 1,
    borderColor: "#FCA5A5",
    borderRadius: 18,
  },

  reasonChipText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#B91C1C",
  },

  message: {
    width: "100%",

    marginTop: 16,

    fontSize: 15,
    lineHeight: 23,
    color: "#374151",
  },

  emptyMessage: {
    width: "100%",

    marginTop: 16,

    fontSize: 14,
    lineHeight: 21,
    color: "#6B7280",
  },

  footer: {
    alignItems: "flex-end",

    paddingHorizontal: 20,
    paddingTop: 14,
    paddingBottom: 18,

    backgroundColor: "#F9FAFB",

    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
  },

  closeButton: {
    minWidth: 105,

    alignItems: "center",

    paddingHorizontal: 22,
    paddingVertical: 11,

    backgroundColor: "#FFFFFF",

    borderWidth: 1,
    borderColor: "#9CA3AF",
    borderRadius: 22,
  },

  closeButtonDisabled: {
    opacity: 0.55,
  },

  closeButtonText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#374151",
  },

  buttonPressed: {
    opacity: 0.65,
  },
});

export default styles;