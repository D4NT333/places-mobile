import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    gap: 10,
  },

  image: {
    height: 180,
    borderRadius: 14,
    marginRight: 8,
  },

  dots: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },

  dot: {
    width: 8,
    height: 8,
    borderRadius: 999,
    backgroundColor: "#C4C4C4",
  },

  dotActive: {
    backgroundColor: "#222",
  },

  emptyContainer: {
    width: "100%",
  },

  emptyBox: {
    height: 180,
    borderWidth: 1.5,
    borderRadius: 14,
  },
});

export default styles;