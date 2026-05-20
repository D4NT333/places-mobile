import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
 wrapper: {
  backgroundColor: "#F6F7FB",
  paddingHorizontal: 0,
  paddingTop: 8,
},

  container: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",

    paddingVertical: 14,
    paddingHorizontal: 4,

    borderColor: "transparent",

    backgroundColor: "#F6F7FB",

    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },

  icon: {
    width: 38,
    height: 38,
    resizeMode: "contain",
  },
});

export default styles;