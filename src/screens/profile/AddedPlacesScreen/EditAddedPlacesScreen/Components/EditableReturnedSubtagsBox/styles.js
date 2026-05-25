import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    marginTop: 18,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "900",
    color: "#303847",
    marginBottom: 10,
  },

  box: {
    borderWidth: 2,
    borderColor: "#4B5563",
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 14,
  },

  rowBlock: {
    position: "relative",
    paddingTop: 28,
  },

  rowBlockWithGap: {
    marginBottom: 22,
    paddingBottom: 0,
  },

  editButton: {
    position: "absolute",
    top: 0,
    right: 0,
    zIndex: 2,
  },

  editButtonText: {
    fontSize: 14,
    fontWeight: "900",
    color: "#303847",
    textDecorationLine: "underline",
  },

  columns: {
    flexDirection: "row",
    alignItems: "stretch",
  },

  column: {
    flex: 1,
    justifyContent: "flex-start",
  },

  columnLabel: {
    fontSize: 13,
    fontWeight: "800",
    color: "#6B7280",
    marginBottom: 10,
  },

  divider: {
    width: 2,
    backgroundColor: "#4B5563",
    borderRadius: 99,
    marginHorizontal: 18,
    alignSelf: "stretch",
  },

  oldPill: {
    alignSelf: "flex-start",
    minWidth: 120,
    textAlign: "center",
    borderWidth: 2,
    borderColor: "#EF4444",
    color: "#303847",
    borderRadius: 999,
    paddingVertical: 8,
    paddingHorizontal: 14,
    fontSize: 14,
    fontWeight: "900",
  },

  newPill: {
    alignSelf: "flex-start",
    minWidth: 120,
    textAlign: "center",
    borderWidth: 2,
    borderColor: "#22C55E",
    color: "#303847",
    borderRadius: 999,
    paddingVertical: 8,
    paddingHorizontal: 14,
    fontSize: 14,
    fontWeight: "900",
  },

  messageText: {
    marginTop: 10,
    fontSize: 13,
    lineHeight: 18,
    fontWeight: "700",
    color: "#EF4444",
    maxWidth: "95%",
  },

  emptyText: {
    fontSize: 13,
    lineHeight: 18,
    color: "#6B7280",
    fontWeight: "700",
  },
});

export default styles;