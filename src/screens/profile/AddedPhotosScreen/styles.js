import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 16,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 16,
  },

  backButton: {
    fontSize: 24,
    fontWeight: "700",
    color: "#111827",
    lineHeight: 28,
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
  },

  content: {
    gap: 14,
    paddingBottom: 20,
  },
});

export default styles;