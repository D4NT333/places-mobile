import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    padding: 16,
  },

  header: {
    position: "relative",
    minHeight: 56,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 18,
  },

  title: {
    fontSize: 22,
    fontWeight: "900",
    color: "#111",
    textAlign: "center",
    paddingHorizontal: 46,
  },

  summary: {
    backgroundColor: "#F5F5F5",
    padding: 12,
    borderRadius: 14,
    marginBottom: 16,
  },

  summaryText: {
    fontSize: 16,
    fontWeight: "800",
  },

  summarySub: {
    fontSize: 13,
    color: "#555",
    marginTop: 2,
  },

  finishBtn: {
    marginTop: 24,
    height: 56,
    borderRadius: 999,
    borderWidth: 2,
    borderColor: "#111",
    alignItems: "center",
    justifyContent: "center",
  },

  finishText: {
    fontSize: 18,
    fontWeight: "800",
  },

  disabledBtn: {
    opacity: 0.5,
  },

  scrollContent: {
    paddingBottom: 130,
  },

  backButton: {
    position: "absolute",
    left: 0,
    width: 42,
    height: 42,
    justifyContent: "center",
    alignItems: "flex-start",
  },

  backIcon: {
    width: 30,
    height: 30,
    resizeMode: "contain",
  },
});