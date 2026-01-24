import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import RootNavigator from "../navigation/RootNavigator";


export default function App() {
   const isLogged = false;

  return (
    <SafeAreaProvider>
    <NavigationContainer>
      <RootNavigator isLogged={isLogged} />
    </NavigationContainer>
  </SafeAreaProvider>
  );
}
