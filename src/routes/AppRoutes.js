import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import {MainPager} from "../components";
import {PlaceDetailScreen} from "../screens";

const Stack = createNativeStackNavigator();

export default function AppRoutes() {
  return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* Pantalla base: Pager + Footer */}
        <Stack.Screen
          name="Main"
          component={MainPager}
        />

        {/* Pantallas que se abren ENCIMA */}
        <Stack.Screen
          name="PlaceDetailScreen"
          component={PlaceDetailScreen}
        />
      </Stack.Navigator>
  );
}
