import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  pill: {
    alignSelf: "center",
    paddingHorizontal: 9,
    paddingVertical: 3,
    borderRadius: 999,
    borderWidth: 1,
    minHeight: 24,
    alignItems: "center",
    justifyContent: "center",
  },

  text: {
    fontSize: 12,
    fontWeight: "800",
    lineHeight: 15,
  },

  pendingPill: {
    backgroundColor: "#FFF7ED",
    borderColor: "#FDBA74",
  },

  pendingText: {
    color: "#C2410C",
  },

  approvedPill: {
    backgroundColor: "#ECFDF5",
    borderColor: "#6EE7B7",
  },

  approvedText: {
    color: "#047857",
  },

  rejectedPill: {
    backgroundColor: "#FEF2F2",
    borderColor: "#FCA5A5",
  },

  rejectedText: {
    color: "#DC2626",
  },
});

export default styles;