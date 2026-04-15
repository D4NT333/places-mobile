import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    paddingTop: 4,
  },

  title: {
    fontSize: 20,
    lineHeight: 26,
    fontWeight: "700",
    color: "#2A2A2A",
    marginBottom: 18,
  },

  optionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 8,
  },

  optionItem: {
    flex: 1,
    alignItems: "center",
  },

  dot: {
    width: 28,
    height: 18,
    borderRadius: 999,
    backgroundColor: "#111111",
    marginBottom: 8,
  },

  dotSelected: {
    backgroundColor: "#2EC5B6",
  },

  optionLabel: {
    fontSize: 11,
    lineHeight: 13,
    color: "#2A2A2A",
    textAlign: "center",
  },
});

export default styles;