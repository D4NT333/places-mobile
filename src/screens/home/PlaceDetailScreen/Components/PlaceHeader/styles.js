import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    marginBottom: 14,
  },

  topRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  iconButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },

  backIcon: {
    width: 28,
    height: 28,
    resizeMode: "contain",
  },

  titleBox: {
    flex: 1,
    marginHorizontal: 8,
  },

  title: {
    fontSize: 25,
    fontWeight: "900",
    color: "#111111",
  },

  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
    gap: 8,
  },

  metaText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#222222",
  },

  metaDot: {
    width: 6,
    height: 6,
    borderRadius: 999,
    backgroundColor: "#111111",
  },

 heartIcon: {
  resizeMode: "contain",
},

heartOutlineIcon: {
  width: 60,
  height: 60,
},

heartFilledIcon: {
  width: 38,
  height: 38,
},

});