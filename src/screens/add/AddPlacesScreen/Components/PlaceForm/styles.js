import { StyleSheet } from "react-native";

export default StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 26,
    padding: 18,
    marginTop: -30,
    gap: 14,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.07,
    shadowRadius: 16,
    elevation: 4,
  },

  field: {
    gap: 7,
  },

  label: {
    fontSize: 15,
    fontWeight: "800",
    color: "#111827",
  },

  input: {
    height: 48,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 16,
    paddingHorizontal: 15,
    color: "#111827",
    backgroundColor: "#F9FAFB", 
    fontSize: 15,
    fontWeight: "500",
  },

  inputMultiline: {
    height: 118,
    paddingTop: 13,
    textAlignVertical: "top",
  },

  inputWarning: {
    borderColor: "#F59E0B",
    backgroundColor: "#FFFBEB",
  },

  inputDanger: {
    borderColor: "#DC2626",
    backgroundColor: "#FEF2F2",
  },

  inputErrorText: {
    color: "#DC2626",
    marginTop: 2,
    fontSize: 12,
    fontWeight: "700",
  },

  charCount: {
    marginTop: 4,
    alignSelf: "flex-end",
    fontSize: 12,
    color: "#6B7280",
    fontWeight: "700",
  },

  charCountWarning: {
    marginTop: 4,
    alignSelf: "flex-end",
    fontSize: 12,
    color: "#D97706",
    fontWeight: "800",
  },

  charCountDanger: {
    marginTop: 4,
    alignSelf: "flex-end",
    fontSize: 12,
    color: "#DC2626",
    fontWeight: "800",
  },

  chipsWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },

  chip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    borderWidth: 1,
  },

  chipActive: {
    backgroundColor: "#DC2626",
    borderColor: "#DC2626",
  },

  chipInactive: {
    backgroundColor: "#F3F4F6",
    borderColor: "#E5E7EB",
  },

  chipText: {
    fontSize: 12,
    fontWeight: "800",
  },

  chipTextActive: {
    color: "#FFFFFF",
  },

  chipTextInactive: {
    color: "#374151",
  },

  filtersButton: {
  marginTop: 8,
  alignSelf: "flex-start",
  paddingVertical: 3,
  paddingHorizontal: 22,
  borderWidth: 1,
  borderColor: "#0F766E",
  borderRadius: 18,
  backgroundColor: "#0F766E",

  shadowColor: "#0F766E",
  shadowOffset: {
    width: 0,
    height: 7,
  },
  shadowOpacity: 0.2,
  shadowRadius: 10,
  elevation: 3,
},

filtersButtonText: {
  fontSize: 15,
  fontWeight: "900",
  color: "#FFFFFF",
},
});