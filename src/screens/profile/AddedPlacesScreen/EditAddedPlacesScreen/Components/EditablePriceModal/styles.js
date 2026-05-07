import { StyleSheet } from "react-native";

export default StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(17, 24, 39, 0.55)",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 22,
  },

  card: {
    width: "100%",
    borderWidth: 2,
    borderColor: "#111827",
    borderRadius: 18,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 18,
    paddingVertical: 18,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },

  title: {
    flex: 1,
    fontSize: 22,
    fontWeight: "900",
    color: "#374151",
  },

  closeText: {
    fontSize: 28,
    fontWeight: "900",
    color: "#374151",
  },

  doneButton: {
    alignSelf: "center",
    marginTop: 18,
    borderWidth: 1.8,
    borderColor: "#4B5563",
    borderRadius: 999,
    paddingHorizontal: 34,
    paddingVertical: 10,
    backgroundColor: "#FFFFFF",
  },

  doneText: {
    fontSize: 16,
    fontWeight: "900",
    color: "#374151",
  },
});