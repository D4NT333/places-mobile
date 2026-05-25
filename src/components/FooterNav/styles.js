import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "#F6F7FB",
    paddingHorizontal: 0,
    paddingTop: 4,
  },

  container: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",

    paddingVertical: 10,
    paddingHorizontal: 4,

    backgroundColor: "#F6F7FB",

    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.08,
    shadowRadius: 14,
    elevation: 12,
  },

  item: {
    width: 58,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },

  activeCircle: {
    position: "absolute",
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#E1E3E8",
  },

  icon: {
    width: 34,
    height: 34,
    resizeMode: "contain",
    zIndex: 2,
  },

  activeIcon: {
    opacity: 1,
  },

  inactiveIcon: {
    opacity: 0.85,
  },
});

export default styles;