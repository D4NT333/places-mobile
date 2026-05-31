import { StyleSheet } from "react-native";

export default StyleSheet.create({
  keyboardView: {
    flex: 1,
  },

  header: {
    minHeight: 40,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  backButton: {
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
  },

  backIcon: {
    width: 22,
    height: 22,
    resizeMode: "contain",
    tintColor: "#111111",
  },

  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 26,
    fontWeight: "900",
    color: "#111111",
  },

  headerSpacer: {
    width: 36,
    height: 36,
  },

  container: {
    marginTop: 26,
    gap: 18,
  },

  card: {
    width: "100%",
    borderWidth: 1.5,
    borderColor: "#222222",
    borderRadius: 18,
    paddingVertical: 16,
    paddingHorizontal: 18,
    backgroundColor: "#FFFFFF",
  },

  cardTitle: {
    fontSize: 20,
    fontWeight: "900",
    color: "#111111",
    marginBottom: 12,
  },

  cardText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#555555",
    lineHeight: 22,
    marginBottom: 14,
  },

  bottomSpace: {
    height: 80,
  },
});