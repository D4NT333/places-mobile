import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderColor: "#2A2A2A",
    borderRadius: 14,
    backgroundColor: "#FFFFFF",
    paddingVertical: 16,
    paddingHorizontal: 18,
  },

  row: {
    minHeight: 28,
    justifyContent: "center",
  },

  text: {
    fontSize: 18,
    lineHeight: 24,
    fontWeight: "500",
    color: "#3F3F46",
    textAlign: "center",
  },
});

export default styles;