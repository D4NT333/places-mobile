import { StyleSheet } from "react-native";

export default StyleSheet.create({
  header: {
    height: 38,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },

  backButton: {
    width: 34,
    height: 34,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },

  backIcon: {
    width: 24,
    height: 24,
  },

  title: {
    fontSize: 17,
    fontWeight: "800",
    color: "#1C1C1C",
  },

  list: {
    flex: 1,
  },

  listContent: {
    paddingBottom: 40,
  },

  emptyContainer: {
    marginTop: 70,
    alignItems: "center",
    paddingHorizontal: 20,
  },

  emptyTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#222222",
    textAlign: "center",
  },

  emptyText: {
    marginTop: 8,
    fontSize: 13,
    lineHeight: 18,
    color: "#666666",
    textAlign: "center",
  },
});