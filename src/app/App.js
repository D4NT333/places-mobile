import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import AppRoutes from "../routes/AppRoutes";

import { StatusBar } from 'expo-status-bar';

export default function App() {
  return (
    <SafeAreaProvider>
    <NavigationContainer>
      <AppRoutes />
    </NavigationContainer>
  </SafeAreaProvider>
  );
}
