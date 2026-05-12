import { StyleSheet } from "react-native";

export default StyleSheet.create({
  card: {
    height: 720,
    borderWidth: 2,
    borderColor: "#000000",
    borderRadius: 18,
    paddingVertical: 18,
    paddingHorizontal: 16,
    gap: 14,
  },
  form: {
    gap: 20,
    paddingTop: 8,
  },
  hint: {
    marginTop: 10,
    fontSize: 12,
    color: "#666",
    textAlign: "center",
  },
  errorText: {
  color: "#D93025",
  fontSize: 13,
  fontWeight: "500",
  marginTop: -8,
  marginBottom: 4,
  paddingHorizontal: 12,
},
});
