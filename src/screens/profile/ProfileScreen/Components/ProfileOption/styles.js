import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  pressable: {
    width: "100%",
  },

  row: {
    minHeight: 56,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 8,
    paddingVertical: 10,
  },

  subRow: {
    minHeight: 44,
    paddingLeft: 22,
  },

  label: {
    fontSize: 18,
    fontWeight: "500",
    color: "#2B2B2B",
  },

  subLabel: {
    fontSize: 15,
    fontWeight: "400",
    color: "#444",
  },

  divider: {
    height: 1.7,
    backgroundColor: "#7D7D7D",
    marginHorizontal: 10,
  },

  subDivider: {
    marginLeft: 10,
    marginRight: 180,
  },

  emptyIconSpace: {
    width: 28,
    height: 28,
  },
  icon: {
  width: 46,
  height: 46,
},
heartIcon: {
  width: 68,
  height: 68,
  left: 11,
},
});

export default styles;