import { StyleSheet } from "react-native";

export default StyleSheet.create({
  row: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    gap: 10,
  },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 18,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E5E5",
  },
  chipActive: {
    backgroundColor: "#E8F3EC",
    borderColor: "#3BAA6F",
  },
  txt: {
    fontSize: 13,
    color: "#444",
    fontWeight: "500",
  },
  txtActive: {
    color: "#1E7F52",
    fontWeight: "600",
  },
});
