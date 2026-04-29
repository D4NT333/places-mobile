import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  header: {
    minHeight: 62,
    paddingHorizontal: 18,
    paddingTop: 18,
    paddingBottom: 10,
    flexDirection: "row",
    alignItems: "center",
  },

  closeButton: {
    width: 34,
    height: 34,
    borderRadius: 17,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  closeIcon: {
    fontSize: 22,
    fontWeight: "700",
    color: "#4b5563",
  },

  title: {
    flex: 1,
    fontSize: 24,
    fontWeight: "800",
    color: "#374151",
    textAlign: "center",
    marginRight: 46,
  },
});

export default styles;