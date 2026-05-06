import { StyleSheet } from "react-native";

export default StyleSheet.create({
  screenCard: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    overflow: "hidden",
  },

  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 112,
  },
  stateText: {
  marginBottom: 12,
  fontSize: 14,
  fontWeight: "700",
  color: "#4B5563",
},

errorText: {
  marginBottom: 12,
  fontSize: 14,
  fontWeight: "800",
  color: "#B91C1C",
},

generalMessageBox: {
  marginBottom: 18,
  borderWidth: 1.5,
  borderColor: "#B91C1C",
  borderRadius: 10,
  paddingHorizontal: 12,
  paddingVertical: 10,
  backgroundColor: "#FEF2F2",
},

generalMessageText: {
  fontSize: 14,
  fontWeight: "800",
  color: "#B91C1C",
},
});