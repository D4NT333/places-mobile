import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderColor: "#2A2A2A",
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    paddingVertical: 10,
    paddingHorizontal: 14,
  },

  row: {
    minHeight: 22,
    justifyContent: "center",
  },

  text: {
    fontSize: 16,
    lineHeight: 20,
    fontWeight: "500",
    color: "#3F3F46",
    textAlign: "center",
  },
});

export default styles;