import { StyleSheet } from "react-native";

export default StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  backIcon: {
    fontSize: 28,
    lineHeight: 28,
    color: "#111",
    marginTop: -2,
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 18,
    color: "#111",
    fontWeight: "700",
  },
});
