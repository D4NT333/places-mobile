import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  section: {
    marginBottom: 18,
  },

  label: {
    fontSize: 20,
    fontWeight: "800",
    color: "#4b5563",
    marginBottom: 8,
  },

  filtersBox: {
    borderWidth: 2,
    borderColor: "#111827",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 18,
    minHeight: 120,
    justifyContent: "center",
  },

  chipsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },

  chip: {
    borderWidth: 2,
    borderColor: "#7b818a",
    borderRadius: 999,
    paddingHorizontal: 16,
    paddingVertical: 6,
    minWidth: 120,
    alignItems: "center",
  },

  chipText: {
    fontSize: 16,
    fontWeight: "800",
    color: "#4b5563",
  },

  helperText: {
    fontSize: 19,
    color: "#4b5563",
    marginTop: 7,
  },
});

export default styles;