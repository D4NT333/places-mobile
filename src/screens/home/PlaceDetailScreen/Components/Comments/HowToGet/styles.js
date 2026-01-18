import { StyleSheet } from "react-native";

export default StyleSheet.create({
  block: {
    paddingHorizontal: 16,
    paddingTop: 6,
    paddingBottom: 18,
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111",
    marginBottom: 10,
  },
  mapPlaceholder: {
    height: 180,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#e6e6e6",
    backgroundColor: "#fafafa",
    alignItems: "center",
    justifyContent: "center",
  },
  mapText: {
    color: "#888",
    fontWeight: "600",
  },
  addressLabel: {
    marginTop: 12,
    color: "#666",
    fontSize: 12,
  },
  addressText: {
    marginTop: 4,
    color: "#111",
    lineHeight: 20,
  },
  btn: {
    marginTop: 14,
    height: 46,
    borderRadius: 12,
    backgroundColor: "#111",
    alignItems: "center",
    justifyContent: "center",
  },
  btnText: {
    color: "#fff",
    fontWeight: "700",
  },
});