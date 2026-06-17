import {
  StyleSheet,
} from "react-native";

const styles =
  StyleSheet.create({
    container: {
      width: 72,
      height: 72,
      borderRadius: 14,
      backgroundColor:
        "#E5E7EB",
    },

    loadingContainer: {
      alignItems: "center",
      justifyContent:
        "center",
    },

    fallbackContainer: {
      alignItems: "center",
      justifyContent:
        "center",
      backgroundColor:
        "#E9ECF5",
    },

    fallbackText: {
      fontSize: 24,
      fontWeight: "700",
      color: "#667085",
    },
  });

export default styles;