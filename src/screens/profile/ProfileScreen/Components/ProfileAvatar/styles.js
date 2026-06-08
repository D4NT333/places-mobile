import { StyleSheet } from "react-native";

const AVATAR_SIZE = 118;

export default StyleSheet.create({
  circle: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2,
    borderWidth: 2,
    borderColor: "#111111",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
  },

  image: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2,
    borderWidth: 2,
    borderColor: "#111111",
    backgroundColor: "#FFFFFF",
  },

  initial: {
    fontSize: 44,
    fontWeight: "800",
    color: "#111111",
  },

  text: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111111",
    textAlign: "center",
  },
});