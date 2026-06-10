import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(2, 8, 23, 0.55)",
    justifyContent: "center",
    alignItems: "center",
    padding: 22,
  },

  modal: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderRadius: 26,
    padding: 20,
  },

  header: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 12,
    marginBottom: 18,
  },

  title: {
    flex: 1,
    fontSize: 22,
    fontWeight: "900",
    color: "#071330",
  },

  closeButton: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#F1F5F9",
    alignItems: "center",
    justifyContent: "center",
  },

  closeText: {
    fontSize: 24,
    fontWeight: "900",
    color: "#0F172A",
    marginTop: -2,
  },

  loadingBox: {
    minHeight: 150,
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },

  loadingText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#64748B",
  },

  errorBox: {
    backgroundColor: "#FEF2F2",
    borderRadius: 18,
    padding: 16,
    marginBottom: 18,
  },

  errorTitle: {
    fontSize: 16,
    fontWeight: "900",
    color: "#991B1B",
    marginBottom: 6,
  },

  errorText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#7F1D1D",
    lineHeight: 20,
  },

  content: {
    gap: 10,
    marginBottom: 18,
  },

  label: {
    fontSize: 13,
    fontWeight: "900",
    color: "#475569",
    textTransform: "uppercase",
    letterSpacing: 0.4,
    marginTop: 4,
  },

  reasonChip: {
    alignSelf: "flex-start",
    backgroundColor: "#FEE2E2",
    borderWidth: 1,
    borderColor: "#FCA5A5",
    borderRadius: 999,
    paddingVertical: 8,
    paddingHorizontal: 14,
    marginBottom: 8,
  },

  reasonChipText: {
    fontSize: 13,
    fontWeight: "900",
    color: "#991B1B",
  },

  messageBox: {
    backgroundColor: "#F8FAFC",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 18,
    padding: 16,
    minHeight: 110,
  },

  messageText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#0F172A",
    lineHeight: 22,
  },

  primaryButton: {
    backgroundColor: "#071330",
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
  },

  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "900",
  },
});

export default styles;