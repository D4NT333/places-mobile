import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  card: {
    flex: 1,
    borderWidth: 1.5,
    borderColor: "#374151",
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 12,
    paddingTop: 12,
    paddingBottom: 16,
  },

  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18,
  },

  closeButton: {
    width: 28,
    height: 28,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },

  closeText: {
    fontSize: 20,
    fontWeight: "700",
    color: "#374151",
  },

  placeName: {
    flex: 1,
    fontSize: 16,
    fontWeight: "700",
    color: "#374151",
  },

  statusText: {
    marginLeft: 8,
    fontSize: 13,
    fontWeight: "700",
    color: "#6B7280",
    maxWidth: 72,
    textAlign: "right",
  },

  submittedAt: {
    fontSize: 13,
    fontWeight: "700",
    color: "#4B5563",
    marginBottom: 10,
  },

  divider: {
    height: 1.5,
    backgroundColor: "#4B5563",
    marginBottom: 8,
  },
});

export default styles;