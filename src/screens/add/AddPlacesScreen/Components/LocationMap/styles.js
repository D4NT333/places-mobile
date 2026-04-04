import { StyleSheet } from "react-native";

export default StyleSheet.create({
  box: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 20,
    padding: 16,
    marginTop: 16,
    backgroundColor: "transparent",
  },

  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111",
    textAlign: "center",
    marginBottom: 8,
  },

  subtitle: {
    fontSize: 12,
    color: "#6B7280",
    textAlign: "center",
    marginBottom: 12,
  },

  map: {
    width: "100%",
    height: 300,
    borderRadius: 16,
  },

  loading: {
    height: 300,
    justifyContent: "center",
    alignItems: "center",
  },
});