import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },

  titleRow: {
    flexDirection: "row",
    alignItems: "flex-start",

    gap: 12,
  },

  placeName: {
    flex: 1,

    fontSize: 21,
    lineHeight: 27,
    fontWeight: "700",
    color: "#1F2937",
  },

  statusChip: {
    minWidth: 92,

    alignItems: "center",

    paddingHorizontal: 13,
    paddingVertical: 6,

    borderWidth: 1,
    borderRadius: 18,
  },

  statusText: {
    fontSize: 12,
    fontWeight: "700",
  },

  submittedAt: {
    marginTop: 2,

    fontSize: 13,
    color: "#6B7280",
  },

  chipsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",

    gap: 8,

    marginTop: 12,
  },

  infoChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,

    backgroundColor: "#FFFFFF",

    borderWidth: 1,
    borderColor: "#9CA3AF",
    borderRadius: 18,
  },

  infoChipText: {
    fontSize: 13,
    fontWeight: "500",
    color: "#374151",
  },
});

export default styles;