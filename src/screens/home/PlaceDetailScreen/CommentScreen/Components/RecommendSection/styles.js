import { StyleSheet } from "react-native";

const POSITIVE_BORDER = "#2EC5B6";
const NEGATIVE_BORDER = "#EF6B6B";

const styles = StyleSheet.create({
  container: {
    paddingBottom: 22,
    borderBottomWidth: 1,
    borderBottomColor: "#D1D5DB",
  },

  question: {
    fontSize: 24,
    lineHeight: 30,
    fontWeight: "700",
    color: "#2A2A2A",
    textAlign: "center",
    marginBottom: 20,
  },

  optionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 14,
  },

  optionButton: {
    flex: 1,
    minHeight: 46,
    borderWidth: 2,
    borderColor: "#6B7280",
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
  },

  leftButton: {},

  rightButton: {},

  optionText: {
    fontSize: 18,
    lineHeight: 22,
    fontWeight: "600",
    color: "#4B5563",
  },

  summaryCard: {
    minHeight: 56,
    borderWidth: 2,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
  },

  summaryPositive: {
    borderColor: POSITIVE_BORDER,
    backgroundColor: "#F2FFFD",
  },

  summaryNegative: {
    borderColor: NEGATIVE_BORDER,
    backgroundColor: "#FFF6F6",
  },

  summaryQuestion: {
    flex: 1,
    fontSize: 18,
    lineHeight: 24,
    fontWeight: "700",
    color: "#374151",
    paddingRight: 12,
  },

  summaryAnswer: {
    fontSize: 18,
    lineHeight: 24,
    fontWeight: "700",
    color: "#374151",
  },
});

export default styles;