import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(15, 23, 42, 0.45)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },

  modalCard: {
    width: "100%",
    backgroundColor: "#ffffff",
    borderRadius: 24,
    paddingVertical: 24,
    paddingHorizontal: 22,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.18,
    shadowRadius: 18,
    elevation: 8,
  },

  title: {
    fontSize: 22,
    fontWeight: "800",
    color: "#111827",
    marginBottom: 10,
    textAlign: "center",
  },

  message: {
    fontSize: 16,
    color: "#374151",
    lineHeight: 23,
    textAlign: "center",
  },

  placeName: {
    fontWeight: "800",
    color: "#111827",
  },

  warningText: {
    fontSize: 14,
    color: "#6b7280",
    marginTop: 8,
    textAlign: "center",
  },

  buttonsRow: {
    flexDirection: "row",
    gap: 12,
    marginTop: 24,
  },

  cancelButton: {
    flex: 1,
    height: 48,
    borderRadius: 999,
    borderWidth: 1.5,
    borderColor: "#9ca3af",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },

  cancelButtonText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#374151",
  },

  deleteButton: {
    flex: 1,
    height: 48,
    borderRadius: 999,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ef4444",
  },

  deleteButtonText: {
    fontSize: 15,
    fontWeight: "800",
    color: "#ffffff",
  },
});

export default styles;