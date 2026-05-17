import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    alignItems: "center",
    gap: 42,
    paddingTop: 36,
  },
  logoWrap: {
  width: 200,
  height: 200,
  borderRadius: 999,
  borderWidth: 2,
  borderColor: "#ffffff",
  alignItems: "center",
  justifyContent: "center",
  overflow: "hidden", 
  },
  subtitle: {
    fontSize: 15,
    color: "#1f1d1d",
    textAlign: "center",
    height: 40,
  },
  logo: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",

  },
});
