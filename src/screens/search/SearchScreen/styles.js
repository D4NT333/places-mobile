import {
  StyleSheet,
} from "react-native";

export default StyleSheet.create({
  header: {
    marginBottom: 18,
  },

  headerTitle: {
    fontSize: 34,
    fontWeight: "900",
    color: "#111827",
    marginBottom: 6,
  },

  headerSubtitle: {
    fontSize: 15,
    lineHeight: 21,
    color: "#6B7280",
    fontWeight: "600",
  },

  listContent: {
    paddingTop: 16,
    paddingBottom: 130,
  },

  emptyListContent: {
    flexGrow: 1,
  },

  separator: {
    height: 12,
  },

  loadingBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    paddingTop: 18,
  },

  loadingText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#6B7280",
  },

  emptyBox: {
    marginTop: 40,
    padding: 22,
    borderRadius: 24,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },

  emptyTitle: {
    fontSize: 18,
    fontWeight: "900",
    color: "#111827",
    marginBottom: 6,
  },

  emptyText: {
    fontSize: 14,
    color: "#6B7280",
    textAlign: "center",
    lineHeight: 20,
  },
  initialState: {
  alignSelf: "center",
  alignItems: "center",
  width: "82%",
  marginTop: 42,
  paddingVertical: 18,
  paddingHorizontal: 20,
},

initialIcon: {
  width: 44,
  height: 44,
  borderRadius: 14,
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#E8EDFF",
  marginBottom: 12,
},

initialIconText: {
  fontSize: 25,
  fontWeight: "700",
  color: "#4F46E5",
  lineHeight: 28,
},

initialTitle: {
  fontSize: 17,
  fontWeight: "800",
  color: "#111827",
  marginBottom: 5,
},

initialText: {
  maxWidth: 250,
  fontSize: 13,
  lineHeight: 18,
  color: "#6B7280",
  textAlign: "center",
},
});