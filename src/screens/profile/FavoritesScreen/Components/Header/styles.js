import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    marginBottom: 18,
  },

  topRow: {
    height: 48,
    flexDirection: "row",
    alignItems: "center",
  },

  backButton: {
    width: 42,
    height: 42,
    alignItems: "flex-start",
    justifyContent: "center",
  },

  backIcon: {
    width: 24,
    height: 24,
    resizeMode: "contain",
    tintColor: "#111111",
  },

  title: {
    flex: 1,
    textAlign: "center",
    fontSize: 26,
    fontWeight: "800",
    color: "#111111",
  },

  placeholder: {
    width: 42,
    height: 42,
  },

  subtitle: {
    marginTop: 2,
    textAlign: "center",
    fontSize: 14,
    fontWeight: "600",
    color: "#4B4B4B",
  },
});

export default styles;