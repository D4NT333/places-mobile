import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    borderWidth: 1.5,
    borderColor: "#6B7280",
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
    overflow: "hidden",
    minHeight: 118,
  },

  imageBox: {
    width: 102,
    minHeight: 118,
    borderRightWidth: 1.5,
    borderRightColor: "#6B7280",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F3F4F6",
  },

  imageText: {
    fontSize: 22,
    fontWeight: "700",
    color: "#4B5563",
  },

  infoSection: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 8,
    justifyContent: "space-between",
  },

  name: {
    fontSize: 13,
    fontWeight: "700",
    color: "#374151",
  },

  submittedAt: {
    marginTop: 2,
    fontSize: 11,
    color: "#6B7280",
    fontWeight: "500",
  },

  divider: {
    marginTop: 8,
    marginBottom: 6,
    height: 1,
    backgroundColor: "#6B7280",
    width: "100%",
  },

  status: {
    alignSelf: "flex-end",
    fontSize: 12,
    fontWeight: "600",
    color: "#4B5563",
    marginBottom: 8,
  },

  actionsRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: 8,
  },

  secondaryButton: {
    minWidth: 82,
    height: 28,
    borderRadius: 999,
    borderWidth: 1.5,
    borderColor: "#9CA3AF",
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
  },

  secondaryButtonText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#4B5563",
  },

  primaryButton: {
    minWidth: 76,
    height: 28,
    borderRadius: 999,
    borderWidth: 1.5,
    borderColor: "#9CA3AF",
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
  },

  primaryButtonText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#4B5563",
  },
});

export default styles;