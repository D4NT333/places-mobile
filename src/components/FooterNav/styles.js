import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    wrapper: {
    backgroundColor: "#fff", 
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 14,
    margin: 16,
    borderWidth: 2,
    borderColor: "#ffffffff",
    borderRadius: 16,
    backgroundColor: "#fff",
    //marginBottom: 50, 
  },
  icon: {
    width: 33,
    height: 33,
    resizeMode: "contain",
  },
});

export default styles;