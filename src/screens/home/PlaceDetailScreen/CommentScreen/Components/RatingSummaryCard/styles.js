import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderColor: "#2A2A2A",
    borderRadius: 14,
    backgroundColor: "#FFFFFF",
    paddingVertical: 16,
    paddingHorizontal: 14,
    alignItems: "center",
    justifyContent: "center",
  },

  starsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    marginBottom: 8,
  },

  star: {
    fontSize: 34,
    lineHeight: 38,
    color: "#D1D5DB",
  },

  starSelected: {
    color: "#111111",
  },

  label: {
    fontSize: 14,
    lineHeight: 18,
    fontWeight: "500",
    color: "#4B5563",
    textAlign: "center",
  },
});

export default styles;