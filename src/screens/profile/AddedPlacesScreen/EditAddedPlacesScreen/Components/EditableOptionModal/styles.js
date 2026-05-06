import { StyleSheet } from "react-native";

export default StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(17, 24, 39, 0.45)",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 22,
  },

  card: {
    width: "100%",
    maxHeight: "72%",
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    borderWidth: 2,
    borderColor: "#111827",
    padding: 18,
  },

  header: {
    marginBottom: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  title: {
    fontSize: 20,
    fontWeight: "900",
    color: "#374151",
  },

  closeText: {
    fontSize: 24,
    fontWeight: "900",
    color: "#374151",
  },

  optionsContent: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingBottom: 8,
  },

  optionCard: {
    width: "47%",
    minHeight: 72,
    marginBottom: 14,
    borderWidth: 1.8,
    borderColor: "#4B5563",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 8,
    backgroundColor: "#FFFFFF",
  },

  optionSelected: {
    borderColor: "#EF4444",
    backgroundColor: "#FEF2F2",
  },

  optionText: {
    textAlign: "center",
    fontSize: 15,
    fontWeight: "800",
    color: "#4B5563",
  },

  optionTextSelected: {
    color: "#B91C1C",
  },

  doneButton: {
    marginTop: 8,
    alignSelf: "center",
    borderWidth: 1.8,
    borderColor: "#4B5563",
    borderRadius: 999,
    paddingHorizontal: 28,
    paddingVertical: 8,
  },

  doneButtonText: {
    fontSize: 15,
    fontWeight: "900",
    color: "#374151",
  },
});