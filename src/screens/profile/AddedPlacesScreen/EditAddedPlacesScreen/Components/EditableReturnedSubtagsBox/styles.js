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

  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },

  topActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },

  editText: {
    color: "#303847",
    fontSize: 14,
    fontWeight: "900",
    textDecorationLine: "underline",
  },

  deleteX: {
    color: "#EF4444",
    fontSize: 24,
    fontWeight: "900",
    lineHeight: 26,
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
  topRow: {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: 14,
},

editText: {
  color: "#303847",
  fontSize: 14,
  fontWeight: "900",
  textDecorationLine: "underline",
},

compactContent: {
  alignSelf: "flex-start",
},

pillWrapper: {
  position: "relative",
  alignSelf: "flex-start",
  paddingTop: 6,
  paddingRight: 8,
},

deleteBubble: {
  position: "absolute",
  top: -6,
  right: -6,
  width: 24,
  height: 24,
  borderRadius: 12,
  backgroundColor: "#303847",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 5,
},

deleteBubbleText: {
  color: "#FFFFFF",
  fontSize: 18,
  fontWeight: "900",
  lineHeight: 20,
},

rowBlock: {
  width: "100%",
},

rowBlockWithGap: {
  marginBottom: 28,
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
});

export default styles;