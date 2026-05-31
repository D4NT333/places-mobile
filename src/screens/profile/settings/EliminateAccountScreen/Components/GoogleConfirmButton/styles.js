import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    minHeight: 66,
    borderWidth: 1.5,
    borderColor: "#111111",
    borderRadius: 18,
    paddingVertical: 12,
    paddingHorizontal: 14,
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  containerConfirmed: {
    backgroundColor: "#F4F4F4",
    borderColor: "#111111",
  },

  pressed: {
    opacity: 0.75,
    transform: [{ scale: 0.98 }],
  },

  leftContent: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#ffffff",
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },

  googleIcon: {
    width: 22,
    height: 22,
    resizeMode: "contain",
  },

  textBlock: {
    flex: 1,
  },

  title: {
    fontSize: 16,
    fontWeight: "900",
    color: "#111111",
  },

  subtitle: {
    marginTop: 2,
    fontSize: 13,
    fontWeight: "600",
    color: "#666666",
    lineHeight: 17,
  },

  statusCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 1.5,
    borderColor: "#111111",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
  },

  statusCircleDone: {
    backgroundColor: "#111111",
  },

  statusText: {
    fontSize: 22,
    fontWeight: "900",
    color: "#111111",
    lineHeight: 24,
  },

  statusTextDone: {
    color: "#FFFFFF",
    fontSize: 18,
  },
});