import { StyleSheet } from "react-native";

export default StyleSheet.create({
  sectionTitle: {
    fontSize: 20,
    fontWeight: "900",
    color: "#111111",
    marginBottom: 8,
  },

  spacedTitle: {
    marginTop: 22,
  },

  descriptionText: {
    fontSize: 16,
    lineHeight: 23,
    color: "#222222",
    fontWeight: "500",
  },

secondaryButton: {
  alignSelf: "flex-start",
  marginTop: 16,
  height: 40,
  paddingHorizontal: 20,
  borderRadius: 999,
  backgroundColor: "#111111",
  alignItems: "center",
  justifyContent: "center",
},

secondaryButtonText: {
  fontSize: 14,
  fontWeight: "900",
  color: "#FFFFFF",
},

ratingsRow: {
  flexDirection: "row",
  gap: 14,
  marginTop: 4,
},

ratingCard: {
  flex: 1,
  minHeight: 88,
  borderRadius: 22,
  backgroundColor: "#FFFFFF",
  paddingHorizontal: 16,
  paddingVertical: 14,
  justifyContent: "center",

  borderWidth: 1,
  borderColor: "rgba(0,0,0,0.06)",

  shadowColor: "#000",
  shadowOpacity: 0.08,
  shadowRadius: 10,
  shadowOffset: { width: 0, height: 4 },
  elevation: 3,
},

ratingLabel: {
  fontSize: 15,
  fontWeight: "900",
  color: "#222222",
  marginBottom: 8,
},

ratingRow: {
  flexDirection: "row",
  alignItems: "center",
  gap: 8,
},

ratingNumber: {
  fontSize: 22,
  fontWeight: "900",
  color: "#111111",
},

  tagsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },

tagChip: {
  paddingHorizontal: 18,
  height: 38,
  borderRadius: 999,
  backgroundColor: "#111111",
  alignItems: "center",
  justifyContent: "center",

  shadowColor: "#000",
  shadowOpacity: 0.12,
  shadowRadius: 8,
  shadowOffset: { width: 0, height: 3 },
  elevation: 2,
},

tagText: {
  fontSize: 14,
  fontWeight: "800",
  color: "#FFFFFF",
},
improveDescriptionButton: {
  marginTop: 14,
  alignSelf: "flex-start",
  backgroundColor: "#111827",
  paddingVertical: 10,
  paddingHorizontal: 16,
  borderRadius: 999,
},

improveDescriptionButtonPressed: {
  opacity: 0.85,
},

improveDescriptionText: {
  color: "#FFFFFF",
  fontSize: 14,
  fontWeight: "800",
},

descriptionReviewText: {
  marginTop: 10,
  fontSize: 14,
  fontWeight: "700",
  color: "#6B7280",
},
});