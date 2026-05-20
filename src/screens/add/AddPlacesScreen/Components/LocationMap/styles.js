import { StyleSheet } from "react-native";

export default StyleSheet.create({
  box: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 26,
    padding: 16,
    marginTop: 0,
    backgroundColor: "#FFFFFF",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.07,
    shadowRadius: 16,
    elevation: 4,
  },

  title: {
    fontSize: 22,
    fontWeight: "900",
    color: "#111827",
    textAlign: "center",
    marginBottom: 6,
  },

  subtitle: {
    fontSize: 14,
    color: "#6B7280",
    textAlign: "center",
    marginBottom: 14,
    lineHeight: 20,
    fontWeight: "500",
  },

  map: {
    width: "100%",
    height: 310,
    borderRadius: 20,
  },

  loading: {
    height: 310,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F3F4F6",
    borderRadius: 20,
  },
});