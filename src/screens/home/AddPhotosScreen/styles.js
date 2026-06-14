import { StyleSheet } from "react-native";

export default StyleSheet.create({
  screen: {
    flex: 1,
    minHeight: "100%",
  },

  content: {
    paddingHorizontal: 18,
    paddingTop: 18,
  },

  introductionCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    padding: 16,
    borderRadius: 16,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E7E9EE",
  },

  introductionIcon: {
    width: 46,
    height: 46,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#EAF8EF",
    marginRight: 13,
  },

  introductionTextContainer: {
    flex: 1,
  },

  introductionTitle: {
    color: "#181A20",
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 5,
  },

  introductionDescription: {
    color: "#68707C",
    fontSize: 13,
    lineHeight: 19,
  },

  sectionHeader: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    marginTop: 25,
    marginBottom: 12,
  },

  sectionTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  sectionTitle: {
    color: "#17191E",
    fontSize: 18,
    fontWeight: "700",
  },

  requiredLabel: {
    color: "#198754",
    fontSize: 11,
    fontWeight: "700",
    marginLeft: 9,
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: 20,
    backgroundColor: "#EAF8EF",
  },

  counter: {
    color: "#747C88",
    fontSize: 12,
    fontWeight: "600",
  },

  helpCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#E7E9EE",
    padding: 14,
    marginTop: 20,
  },

  helpTextContainer: {
    flex: 1,
    marginLeft: 10,
  },

  helpTitle: {
    color: "#30343B",
    fontSize: 13,
    fontWeight: "700",
    marginBottom: 3,
  },

  helpText: {
    color: "#737B86",
    fontSize: 12,
    lineHeight: 18,
  },

  remainingText: {
    color: "#858C96",
    fontSize: 12,
    textAlign: "center",
    marginTop: 17,
    marginBottom: 12,
  },
});