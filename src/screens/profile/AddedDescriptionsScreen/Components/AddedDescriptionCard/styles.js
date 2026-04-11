import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  card: {
    borderWidth: 1.5,
    borderColor: "#6B7280",
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 10,
  },

  topRow: {
    flexDirection: "row",
    alignItems: "flex-start",
  },

  imageCircle: {
    width: 58,
    height: 58,
    borderRadius: 29,
    borderWidth: 1.5,
    borderColor: "#6B7280",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
    flexShrink: 0,
  },

  imageText: {
    fontSize: 11,
    fontWeight: "600",
    color: "#4B5563",
  },

  infoSection: {
    flex: 1,
    paddingTop: 4,
  },

  name: {
    fontSize: 12,
    fontWeight: "700",
    color: "#4B5563",
    marginBottom: 2,
  },

  description: {
    fontSize: 12,
    fontWeight: "600",
    color: "#4B5563",
    marginBottom: 4,
  },

  submittedAt: {
    fontSize: 12,
    fontWeight: "700",
    color: "#4B5563",
  },

  bottomSection: {
    marginTop: 8,
  },

  divider: {
    height: 1.5,
    backgroundColor: "#6B7280",
    width: "100%",
  },

  statusRow: {
    alignItems: "flex-end",
    marginTop: 6,
    minHeight: 20,
    justifyContent: "center",
  },

  statusText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#6B7280",
  },

  actionsRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 8,
    marginTop: 4,
  },

  button: {
    minWidth: 86,
    height: 30,
    paddingHorizontal: 12,
    borderRadius: 999,
    borderWidth: 1.5,
    borderColor: "#6B7280",
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },

  buttonText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#6B7280",
  },
});

export default styles;