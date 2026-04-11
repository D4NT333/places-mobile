import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 12,
  },

  container: {
    flex: 1,
    borderWidth: 1.5,
    borderColor: "#4B5563",
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    overflow: "hidden",
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 12,
    paddingVertical: 12,
  },

  backButton: {
    width: 28,
    height: 28,
    justifyContent: "center",
    alignItems: "center",
  },

  backIcon: {
    fontSize: 22,
    fontWeight: "700",
    color: "#111827",
    lineHeight: 24,
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#4B5563",
  },

  content: {
    paddingHorizontal: 8,
    paddingBottom: 16,
    gap: 16,
  },
});

export default styles;