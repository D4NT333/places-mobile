import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(15, 23, 42, 0.45)",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },

  card: {
    width: "100%",
    borderRadius: 24,
    backgroundColor: "#FFFFFF",
    paddingVertical: 24,
    paddingHorizontal: 20,
  },

  title: {
    fontSize: 20,
    fontWeight: "900",
    color: "#303847",
    textAlign: "center",
    marginBottom: 12,
  },

  message: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "600",
    color: "#4B5563",
    textAlign: "center",
  },

  pill: {
    alignSelf: "center",
    marginTop: 18,
    borderWidth: 2,
    borderColor: "#EF4444",
    borderRadius: 999,
    paddingVertical: 8,
    paddingHorizontal: 18,
  },

  pillText: {
    fontSize: 14,
    fontWeight: "900",
    color: "#303847",
  },

  warningText: {
    marginTop: 16,
    fontSize: 13,
    lineHeight: 18,
    fontWeight: "700",
    color: "#EF4444",
    textAlign: "center",
  },

  actions: {
    flexDirection: "row",
    gap: 12,
    marginTop: 24,
  },

  cancelButton: {
    flex: 1,
    minHeight: 46,
    borderRadius: 16,
    backgroundColor: "#F1F5F9",
    alignItems: "center",
    justifyContent: "center",
  },

  cancelButtonText: {
    fontSize: 14,
    fontWeight: "900",
    color: "#303847",
  },

  confirmButton: {
    flex: 1,
    minHeight: 46,
    borderRadius: 16,
    backgroundColor: "#EF4444",
    alignItems: "center",
    justifyContent: "center",
  },

  confirmButtonText: {
    fontSize: 14,
    fontWeight: "900",
    color: "#FFFFFF",
  },
});

export default styles;