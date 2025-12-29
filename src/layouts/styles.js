import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  headerContainer: {
    // El header puede tener su propio estilo
    zIndex: 10,
  },
  footerContainer: {
    // Footer/nav bar al fondo
    zIndex: 10,
  },
});