import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  backIcon: { fontSize: 28, lineHeight: 28 },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "700",
  },

  logoutBtn: {
    marginTop: 18,
    borderWidth: 1,
    borderColor: "#C1121F",
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  logoutPressed: { opacity: 0.75 },
  logoutText: { color: "#C1121F", fontSize: 15, fontWeight: "800" },
});

export default styles;