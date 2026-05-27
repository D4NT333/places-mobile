import { StyleSheet } from "react-native";

export default StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: "800",
    color: "#111111",
    marginBottom: 8,
  },

  mapBox: {
    height: 220,
    borderWidth: 1.6,
    borderColor: "#111111",
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
  },

  mapText: {
    fontSize: 24,
    fontWeight: "500",
    color: "#333333",
  },

  locationTitle: {
    marginTop: 12,
    fontSize: 15,
    fontWeight: "800",
    color: "#222222",
  },

  addressText: {
    marginTop: 3,
    fontSize: 15,
    lineHeight: 20,
    color: "#222222",
  },

  reportBox: {
    marginTop: 38,
  },

  reportTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: "#111111",
    marginBottom: 10,
  },

  reportButton: {
    alignSelf: "flex-start",
    minWidth: 190,
    height: 34,
    borderWidth: 1.6,
    borderColor: "#111111",
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
  },

  reportButtonText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#222222",
  },
});