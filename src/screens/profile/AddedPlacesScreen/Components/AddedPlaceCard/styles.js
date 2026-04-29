import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  card: {
    borderWidth: 1.5,
    borderColor: "#8D8D8D",
    borderRadius: 8,
    paddingTop: 10,
    paddingHorizontal: 10,
    paddingBottom: 10,
    backgroundColor: "#FFFFFF",
  },

  topRow: {
    flexDirection: "row",
    alignItems: "flex-start",
  },

  image: {
    width: 54,
    height: 54,
    borderRadius: 27,
    borderWidth: 1.5,
    borderColor: "#8D8D8D",
    backgroundColor: "#E8E8E8",
    marginRight: 10,
  },

  infoContainer: {
    flex: 1,
    minWidth: 0,
  },

  name: {
    fontSize: 13,
    fontWeight: "700",
    color: "#3A3A3A",
    marginBottom: 6,
  },

  chipsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
    marginBottom: 8,
  },

  chip: {
    borderWidth: 1,
    borderColor: "#8D8D8D",
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 2,
    backgroundColor: "#FFFFFF",
  },

  chipText: {
    fontSize: 10,
    color: "#555555",
  },

  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
  },

  dateText: {
    flex: 1,
    fontSize: 11,
    color: "#666666",
  },

  statusText: {
    fontSize: 11,
    color: "#555555",
  },

  divider: {
    height: 1,
    backgroundColor: "#A9A9A9",
    marginTop: 10,
    marginBottom: 10,
  },

  actionsRow: {
    minHeight: 30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 8,
  },

  actionButton: {
    minWidth: 78,
    height: 28,
    borderWidth: 1,
    borderColor: "#8D8D8D",
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
    backgroundColor: "#FFFFFF",
  },

  actionButtonText: {
    fontSize: 11,
    fontWeight: "500",
    color: "#444444",
  },
});

export default styles;