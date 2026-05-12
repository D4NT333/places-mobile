import { StyleSheet } from "react-native";

export default StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(15, 23, 42, 0.45)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 18,
  },

  backdropPressable: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },

  modalCard: {
    width: "100%",
    maxHeight: "78%",
    backgroundColor: "#FFFFFF",
    borderRadius: 28,
    paddingTop: 20,
    paddingHorizontal: 18,
    paddingBottom: 20,
  },

  header: {
    marginBottom: 16,
  },

  title: {
    fontSize: 20,
    fontWeight: "800",
    color: "#111827",
    textAlign: "center",
  },

  subtitle: {
    marginTop: 4,
    fontSize: 13,
    color: "#6B7280",
    textAlign: "center",
  },

  columns: {
    flexDirection: "row",
    gap: 10,
  },

  column: {
    flex: 1,
  },

  columnTitle: {
    fontSize: 12,
    fontWeight: "700",
    color: "#6B7280",
    textAlign: "center",
    marginBottom: 8,
  },

  scrollBox: {
    maxHeight: 170,
    borderRadius: 18,
    backgroundColor: "#F9FAFB",
    paddingVertical: 6,
  },

  option: {
    minHeight: 42,
    borderRadius: 14,
    marginHorizontal: 6,
    marginVertical: 3,
    alignItems: "center",
    justifyContent: "center",
  },

  optionSelected: {
    backgroundColor: "#111827",
  },

  optionText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#374151",
  },

  optionTextSelected: {
    color: "#FFFFFF",
    fontWeight: "800",
  },

  actions: {
    flexDirection: "row",
    gap: 12,
    marginTop: 18,
  },

  cancelButton: {
    flex: 1,
    height: 48,
    borderRadius: 16,
    backgroundColor: "#F3F4F6",
    alignItems: "center",
    justifyContent: "center",
  },

  cancelText: {
    fontSize: 14,
    fontWeight: "800",
    color: "#374151",
  },

  confirmButton: {
    flex: 1,
    height: 48,
    borderRadius: 16,
    backgroundColor: "#111827",
    alignItems: "center",
    justifyContent: "center",
  },

  confirmText: {
    fontSize: 14,
    fontWeight: "800",
    color: "#FFFFFF",
  },
});