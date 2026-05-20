import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    backgroundColor: "#F9FAFB",
    borderRadius: 20,
    padding: 14,
    gap: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },

  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
  },

  title: {
    fontSize: 16,
    fontWeight: "900",
    color: "#111827",
    flex: 1,
  },

  editText: {
    fontSize: 13,
    fontWeight: "900",
    color: "#0F766E",
  },

  chipsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },

 chip: {
  paddingVertical: 8,
  paddingHorizontal: 12,
  borderRadius: 999,
  backgroundColor: "#0F766E",
},

chipText: {
  color: "#FFFFFF",
  fontSize: 12,
  fontWeight: "800",
},

chipSecondary: {
  paddingVertical: 8,
  paddingHorizontal: 12,
  borderRadius: 999,
  backgroundColor: "#F0FDFA",
  borderWidth: 1,
  borderColor: "#99F6E4",
},

chipSecondaryText: {
  color: "#115E59",
  fontSize: 12,
  fontWeight: "800",
},

  priceText: {
    fontSize: 13,
    fontWeight: "800",
    color: "#374151",
  },

  scheduleText: {
    marginTop: 4,
    fontSize: 14,
    fontWeight: "900",
    color: "#111827",
  },
});