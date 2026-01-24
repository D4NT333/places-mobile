import { createNativeStackNavigator } from "@react-navigation/native-stack";

import {LoginScreen} from "../screens";
import { LoginPasswordScreen } from "../screens";
import { LoginRegisterScreen } from "../screens";
import { LoginRecoverScreen } from "../screens";

const Stack = createNativeStackNavigator();

export default function AuthNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="LoginScreen"
      screenOptions={{headerShown: false, animation: "slide_from_right",}}
    >
      <Stack.Screen name="LoginScreen" component={LoginScreen} />

      <Stack.Screen name="LoginPasswordScreen" component={LoginPasswordScreen} />

      <Stack.Screen name="LoginRegisterScreen" component={LoginRegisterScreen} />

      <Stack.Screen name="LoginRecoverScreen" component={LoginRecoverScreen} />

    </Stack.Navigator>
  );
}
