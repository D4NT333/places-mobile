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

    borderWidth: 1,
    borderColor: "#ffffff",


    backgroundColor: "#FFFFFF",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.08,
    shadowRadius: 14,
    elevation: 12,
  },

  icon: {
    width: 38,
    height: 38,
    resizeMode: "contain",
  },
});

export default styles;