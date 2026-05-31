import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 12,
    borderWidth: 1.5,
    borderColor: "#222222",
    borderRadius: 18,
    paddingVertical: 16,
    paddingHorizontal: 18,
    backgroundColor: "#F7F7F7",
  },

  iconCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#111111",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 2,
  },

  icon: {
    fontSize: 20,
    fontWeight: "900",
    color: "#FFFFFF",
    lineHeight: 22,
  },

  textContent: {
    flex: 1,
  },

  title: {
    fontSize: 20,
    fontWeight: "900",
    color: "#111111",
    marginBottom: 6,
  },

  description: {
    fontSize: 15,
    fontWeight: "600",
    color: "#555555",
    lineHeight: 22,
  },
});