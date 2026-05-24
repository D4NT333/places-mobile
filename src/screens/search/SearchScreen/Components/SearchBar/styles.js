import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    height: 54,
    borderRadius: 999,
    borderWidth: 1.5,
    borderColor: "#D1D5DB",
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 18,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 3,
  },

  icon: {
    width: 24,
    height: 24,
    resizeMode: "contain",
    marginRight: 12,
  },

  input: {
    flex: 1,
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
    paddingVertical: 0,
  },
});