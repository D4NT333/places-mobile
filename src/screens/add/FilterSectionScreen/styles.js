import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    padding: 16,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 10,
  },

  back: {
    fontSize: 22,
    fontWeight: "800",
  },

  title: {
    fontSize: 26,
    fontWeight: "800",
    color: "#111",
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
});