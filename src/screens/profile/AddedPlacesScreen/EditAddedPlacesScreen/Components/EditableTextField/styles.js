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

  input: {
    minHeight: 46,
    borderWidth: 2,
    borderColor: "#7b818a",
    borderRadius: 23,
    paddingHorizontal: 16,
    paddingVertical: 8,
    fontSize: 19,
    color: "#111827",
    backgroundColor: "#ffffff",
  },

  multilineInput: {
    minHeight: 56,
    textAlignVertical: "top",
  },

  helperText: {
    fontSize: 19,
    color: "#4b5563",
    marginTop: 7,
  },
});

export default styles;