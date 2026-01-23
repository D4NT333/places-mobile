import { StyleSheet } from "react-native";

export default StyleSheet.create({
  screen: { flex: 1 },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  closeBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#111",
    alignItems: "center",
    justifyContent: "center",
  },
  closeText: { fontSize: 18, color: "#111", marginTop: -2 },
  headerTitle: { fontSize: 16, fontWeight: "700", color: "#111" },

  subtitle: { fontSize: 12, color: "#444", marginBottom: 14 },

  sectionTitle: { fontSize: 13, fontWeight: "700", color: "#111", marginTop: 10, marginBottom: 8 },

  card: {
    borderWidth: 1,
    borderColor: "#111",
    borderRadius: 12,
    padding: 12,
    backgroundColor: "#FFF",
  },
  cardText: { fontSize: 12, color: "#111", lineHeight: 18 },

  tips: {
    marginTop: 12,
    borderWidth: 1,
    borderColor: "#111",
    borderRadius: 12,
    padding: 12,
    backgroundColor: "#FFF",
  },
  tipsTitle: { fontSize: 12, fontWeight: "700", marginBottom: 6, color: "#111" },
  tipItem: { fontSize: 12, color: "#111", lineHeight: 18 },

  inputCard: {
    borderWidth: 1,
    borderColor: "#111",
    borderRadius: 12,
    padding: 10,
    backgroundColor: "#FFF",
  },
  input: {
    minHeight: 120,
    fontSize: 12,
    color: "#111",
    textAlignVertical: "top",
  },

  counterRow: {
    marginTop: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  counterHint: { fontSize: 11, color: "#444" },
  counter: { fontSize: 11, color: "#444" },

  sendBtn: {
    marginTop: 14,
    height: 44,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#111",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E9EDF2",
  },
  sendBtnPressed: { opacity: 0.85 },
  sendBtnDisabled: { opacity: 0.5 },
  sendBtnText: { fontSize: 14, fontWeight: "700", color: "#111" },
  sendBtnTextDisabled: { color: "#333" },
});
