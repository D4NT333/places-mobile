import { StyleSheet } from "react-native";

export default StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(17, 24, 39, 0.55)",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },

  card: {
    width: "100%",
    borderRadius: 24,
    borderWidth: 2,
    borderColor: "#111827",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 22,
    paddingVertical: 24,
  },

  title: {
    fontSize: 24,
    fontWeight: "900",
    color: "#111827",
    textAlign: "center",
    marginBottom: 12,
  },

  message: {
    fontSize: 15,
    fontWeight: "700",
    color: "#4B5563",
    textAlign: "center",
    lineHeight: 21,
    marginBottom: 8,
  },

  button: {
    alignSelf: "center",
    marginTop: 18,
    borderRadius: 999,
    borderWidth: 1.8,
    borderColor: "#111827",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 34,
    paddingVertical: 11,
  },

  buttonText: {
    fontSize: 16,
    fontWeight: "900",
    color: "#111827",
  },
});