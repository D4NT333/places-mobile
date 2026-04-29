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

  photosBox: {
    borderWidth: 2,
    borderColor: "#7b818a",
    borderRadius: 8,
    paddingHorizontal: 24,
    paddingVertical: 24,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: 28,
  },

  photoItem: {
    width: "45%",
  },

  photoTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#4b5563",
    marginBottom: 10,
  },

  photoPlaceholder: {
    height: 76,
    borderWidth: 2,
    borderColor: "#7b818a",
    borderRadius: 6,
    backgroundColor: "#ffffff",
  },

  photoHelper: {
    fontSize: 15,
    color: "#6b7280",
    marginTop: 6,
  },
});

export default styles;