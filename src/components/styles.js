import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 14,
    margin: 16,
    borderWidth: 2,
    borderColor: "#000",
    borderRadius: 16,
    backgroundColor: "#fff",
    marginBottom: 100, 
  },
  icon: {
    width: 26,
    height: 26,
    resizeMode: "contain",
  },
});

export default styles;