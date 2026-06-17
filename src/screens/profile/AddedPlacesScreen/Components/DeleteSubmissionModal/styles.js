import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",

    paddingHorizontal: 24,

    backgroundColor: "rgba(0, 0, 0, 0.48)",
  },

  modalCard: {
    width: "100%",
    maxWidth: 380,

    padding: 22,

    borderRadius: 18,

    backgroundColor: "#FFFFFF",
  },

  title: {
    marginBottom: 12,

    fontSize: 20,
    fontWeight: "700",

    color: "#111827",
  },

  message: {
    fontSize: 16,
    lineHeight: 23,

    color: "#374151",
  },

  itemName: {
    fontWeight: "700",

    color: "#111827",
  },

  warningText: {
    marginTop: 12,

    fontSize: 14,
    lineHeight: 20,

    color: "#6B7280",
  },

  buttonsRow: {
    flexDirection: "row",
    justifyContent: "flex-end",

    gap: 10,
    marginTop: 22,
  },

  cancelButton: {
    minWidth: 100,
    height: 44,

    justifyContent: "center",
    alignItems: "center",

    paddingHorizontal: 16,

    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 10,

    backgroundColor: "#FFFFFF",
  },

  cancelButtonText: {
    fontSize: 15,
    fontWeight: "600",

    color: "#374151",
  },

  deleteButton: {
    minWidth: 100,
    height: 44,

    justifyContent: "center",
    alignItems: "center",

    paddingHorizontal: 16,

    borderRadius: 10,

    backgroundColor: "#DC2626",
  },

  deleteButtonText: {
    fontSize: 15,
    fontWeight: "700",

    color: "#FFFFFF",
  },

  disabledButton: {
    opacity: 0.55,
  },
});

export default styles;