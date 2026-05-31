import { StyleSheet } from "react-native";

export default StyleSheet.create({
  card: {
    width: "100%",
    borderWidth: 1.5,
    borderColor: "#6F7680",
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingTop: 12,
    paddingBottom: 8,
    backgroundColor: "#FFFFFF",
  },

  cardPressed: {
    opacity: 0.75,
  },

  mainRow: {
    flexDirection: "row",
    alignItems: "flex-start",
  },

  imageCircle: {
    width: 62,
    height: 62,
    borderRadius: 31,
    borderWidth: 1.5,
    borderColor: "#6F7680",
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },

  image: {
    width: "100%",
    height: "100%",
    borderRadius: 31,
    resizeMode: "cover",
  },

  imageText: {
    fontSize: 14,
    fontWeight: "800",
    color: "#555555",
  },

  info: {
    flex: 1,
    paddingTop: 2,
  },

  name: {
    fontSize: 16,
    fontWeight: "800",
    color: "#4B5360",
    marginBottom: 2,
  },

  description: {
    fontSize: 14,
    fontWeight: "700",
    color: "#4B5360",
    marginBottom: 5,
  },

  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
  },

  date: {
    flex: 1,
    fontSize: 12,
    fontWeight: "500",
    color: "#111111",
  },

  status: {
    fontSize: 12,
    fontWeight: "800",
    color: "#4B5360",
    textAlign: "right",
  },

  divider: {
    height: 1.5,
    backgroundColor: "#6F7680",
    marginTop: 8,
    marginBottom: 6,
  },

 actionsRow: {
  minHeight: 34,
  flexDirection: "row",
  justifyContent: "flex-end",
  alignItems: "center",
  gap: 8,
},

  actionButton: {
    minHeight: 28,
    paddingHorizontal: 12,
    borderRadius: 999,
    borderWidth: 1.5,
    borderColor: "#706a6a",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
  },

  actionPressed: {
    opacity: 0.7,
  },

  actionText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#111111",
  },
});