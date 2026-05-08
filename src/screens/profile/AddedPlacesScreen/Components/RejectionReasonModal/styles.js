import { StyleSheet } from "react-native";

export default StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(15, 23, 42, 0.55)",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },

  card: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    borderWidth: 2,
    borderColor: "#111827",
    padding: 22,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 18,
  },

  title: {
    fontSize: 24,
    fontWeight: "900",
    color: "#111827",
  },

  closeText: {
    fontSize: 30,
    fontWeight: "900",
    color: "#111827",
  },

  reasonChip: {
    alignSelf: "flex-start",
    borderWidth: 2,
    borderColor: "#DC2626",
    backgroundColor: "#FEF2F2",
    borderRadius: 999,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginBottom: 14,
  },

  reasonChipText: {
    color: "#991B1B",
    fontWeight: "900",
    fontSize: 14,
  },

  messageBox: {
    minHeight: 120,
    borderWidth: 2,
    borderColor: "#DC2626",
    backgroundColor: "#FEF2F2",
    borderRadius: 14,
    padding: 16,
  },

  messageText: {
    color: "#111827",
    fontSize: 16,
    fontWeight: "700",
    lineHeight: 22,
  },

  stateText: {
    color: "#374151",
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 16,
  },

  errorText: {
    color: "#B91C1C",
    fontSize: 16,
    fontWeight: "800",
    marginBottom: 16,
  },

  button: {
    marginTop: 20,
    height: 48,
    borderRadius: 999,
    borderWidth: 2,
    borderColor: "#111827",
    alignItems: "center",
    justifyContent: "center",
  },

  buttonText: {
    color: "#111827",
    fontSize: 16,
    fontWeight: "900",
  },
});