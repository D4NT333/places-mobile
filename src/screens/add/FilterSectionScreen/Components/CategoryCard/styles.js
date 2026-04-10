import { StyleSheet } from "react-native";

export default StyleSheet.create({
  card: {
    width: "47%",
    height: 120,
    borderRadius: 18,
    borderWidth: 1.5,
    borderColor: "#D9D9D9",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
    gap: 8,
  },

  selected: {
    borderColor: "#111",
    backgroundColor: "#F3F3F3",
  },

  emoji: {
    fontSize: 26,
  },

  label: {
    fontSize: 14,
    fontWeight: "700",
  },
  icon: {
  width: 42,
  height: 42,
  resizeMode: "contain",
  marginBottom: 10,
},

iconFallback: {
  width: 42,
  height: 42,
  borderRadius: 21,
  backgroundColor: "#DDD",
  marginBottom: 10,
},
});