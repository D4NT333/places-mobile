import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    wrapper: {
    backgroundColor: "#157059ff", 
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 14,
    //margin: 16,
    borderWidth: 2,
    borderColor: "#000000ff",
    borderRadius: 16,
    backgroundColor: "#c53d3dff",
    //marginBottom: 50, 
  },
  icon: {
    width: 36,
    height: 36,
    resizeMode: "contain",
  },
});

export default styles;