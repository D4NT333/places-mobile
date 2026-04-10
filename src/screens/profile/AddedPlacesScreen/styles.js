import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    paddingTop: 18,
    paddingHorizontal: 14,
    paddingBottom: 0,
  },

  headerContainer: {
    marginBottom: 14,
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#2E2E2E",
    marginBottom: 8,
  },

  helperText: {
    fontSize: 12,
    lineHeight: 16,
    color: "#5F5F5F",
    textAlign: "center",
    paddingHorizontal: 18,
  },

  scrollContent: {
    paddingBottom: 24,
    gap: 14,
  },
});

export default styles;