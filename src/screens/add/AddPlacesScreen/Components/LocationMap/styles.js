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

  mapContainer: {
    width: "100%",
    height: 310,
    borderWidth: 1.5,
    borderColor: "#111827",
    borderRadius: 20,
    overflow: "hidden",
    backgroundColor: "#F3F4F6",
  },

  map: {
    width: "100%",
    height: "100%",
  },

  helperText: {
    marginTop: 12,
    fontSize: 13,
    color: "#6B7280",
    textAlign: "center",
    lineHeight: 18,
    fontWeight: "500",
  },

  helperTextSuccess: {
    color: "#15803D",
    fontWeight: "700",
  },

  loading: {
    height: 310,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F3F4F6",
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: "#111827",
  },
});