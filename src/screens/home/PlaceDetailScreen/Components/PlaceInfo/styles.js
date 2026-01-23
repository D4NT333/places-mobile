import { StyleSheet } from "react-native";

export default StyleSheet.create({
  card: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 16,
    backgroundColor: "#e10cfdff"
  },
  rowTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
    alignItems: "flex-start",
  },
  title: {
    //flex: 1, Para que solo use el espacio necesario, si no ocupa todo el row
    fontSize: 20,
    fontWeight: "700",
    color: "#000000ff",
  },
  distance: {
    fontSize: 12,
    color: "#666",
    marginTop: 6,
  },
  desc: {
    marginTop: 10,
    fontSize: 14,
    lineHeight: 20,
    color: "#333",
  },
  ratingRow: {
    marginTop: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  ratingText: {
    fontWeight: "700",
    color: "#111",
  },
  stars: {
    fontSize: 14,
    color: "#111",
  },
  reviews: {
    color: "#666",
    fontSize: 12,
  },
  tagsWrap: {
    marginTop: 12,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  tag: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#fafafa",
  },
  tagText: {
    fontSize: 12,
    color: "#333",
  },

  
    improveBtn: {
    alignSelf: "flex-start",
    marginTop: 10,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: "#111",
    borderRadius: 14,
    backgroundColor: "#FFF",
  },
  improveBtnPressed: {
    opacity: 0.75,
  },
  improveBtnText: {
    fontSize: 12,
    color: "#111",
  },

});
