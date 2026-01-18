import { StyleSheet } from "react-native";

export default StyleSheet.create({
  block: {
    paddingHorizontal: 16,
    paddingTop: 6,
    paddingBottom: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111",
    marginBottom: 10,
  },
  divider: {
    height: 1,
    backgroundColor: "#eee",
    marginVertical: 12,
  },

  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  avatar: {
    width: 38,
    height: 38,
    borderRadius: 999,
    backgroundColor: "#e9e9e9",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    color: "#666",
    fontWeight: "700",
  },
  inputBtn: {
    flex: 1,
    height: 42,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#fff",
    justifyContent: "center",
    paddingHorizontal: 14,
  },
  inputBtnText: {
    color: "#777",
  },

  commentItem: {
    flexDirection: "row",
    gap: 12,
    paddingVertical: 10,
  },
  commentBody: {
    flex: 1,
  },
  commentTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
    marginBottom: 4,
  },
  commentName: {
    fontWeight: "700",
    color: "#111",
  },
  commentDate: {
    color: "#888",
    fontSize: 12,
  },
  commentText: {
    color: "#333",
    lineHeight: 20,
  },

  seeMore: {
    alignSelf: "center",
    marginTop: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  seeMoreText: {
    color: "#111",
    fontWeight: "700",
  },
});
