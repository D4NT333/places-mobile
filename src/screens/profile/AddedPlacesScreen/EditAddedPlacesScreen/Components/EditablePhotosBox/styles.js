import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    marginBottom: 22,
  },

  label: {
    marginBottom: 6,
    fontSize: 22,
    fontWeight: "900",
    color: "#4B5563",
  },

  box: {
    borderWidth: 1.8,
    borderColor: "#4B5563",
    borderRadius: 8,
    padding: 16,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  boxReview: {
    borderColor: "#EF4444",
  },

  photoItem: {
    width: "47%",
    marginBottom: 22,
  },

  photoHeader: {
    minHeight: 26,
    marginBottom: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  photoTitle: {
    fontSize: 17,
    fontWeight: "900",
    color: "#4B5563",
  },

  editText: {
    fontSize: 12,
    fontWeight: "900",
    color: "#4B5563",
  },

  photoHelper: {
    marginTop: 4,
    fontSize: 12,
    color: "#6B7280",
  },

  photoHelperReview: {
    color: "#B91C1C",
    fontWeight: "800",
  },

  helperText: {
    marginTop: 8,
    fontSize: 14,
    color: "#6B7280",
  },

  helperReview: {
    color: "#B91C1C",
    fontWeight: "800",
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(17, 24, 39, 0.45)",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },

  modalCard: {
    width: "100%",
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#111827",
    backgroundColor: "#FFFFFF",
    padding: 18,
  },

  modalHeader: {
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  modalTitle: {
    fontSize: 20,
    fontWeight: "900",
    color: "#374151",
  },

  modalClose: {
    fontSize: 24,
    fontWeight: "900",
    color: "#374151",
  },

  modalMessage: {
    marginBottom: 22,
    fontSize: 16,
    lineHeight: 22,
    color: "#111827",
  },

  photoCompareRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  photoCompareColumn: {
    width: "38%",
    alignItems: "center",
  },

  compareLabel: {
    marginBottom: 10,
    fontSize: 20,
    fontWeight: "800",
    color: "#111827",
  },

  comparePhotoText: {
    fontSize: 13,
    fontWeight: "800",
    color: "#4B5563",
  },

  arrowText: {
    fontSize: 42,
    fontWeight: "800",
    color: "#4B5563",
  },

  modalButton: {
    marginTop: 24,
    alignSelf: "center",
    borderWidth: 1.8,
    borderColor: "#4B5563",
    borderRadius: 999,
    paddingHorizontal: 20,
    paddingVertical: 8,
  },

  modalButtonText: {
    fontSize: 14,
    fontWeight: "900",
    color: "#4B5563",
  },
  photoPlaceholder: {
  height: 82,
  borderWidth: 1.6,
  borderColor: "#4B5563",
  borderRadius: 6,
  backgroundColor: "#FFFFFF",
  overflow: "hidden",
  alignItems: "center",
  justifyContent: "center",
},

photoPlaceholderReview: {
  borderColor: "#EF4444",
},

photoImage: {
  width: "100%",
  height: "100%",
},

emptyPhotoText: {
  fontSize: 12,
  fontWeight: "800",
  color: "#9CA3AF",
},

comparePhotoBox: {
  width: "100%",
  height: 110,
  borderWidth: 1.8,
  borderColor: "#4B5563",
  borderRadius: 8,
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#FFFFFF",
  overflow: "hidden",
},
});