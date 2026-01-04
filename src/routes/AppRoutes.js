import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import {MainPager} from "../components";
import {AddPlacesScreen, PlaceDetailScreen} from "../screens";
import {EditProfileScreen} from "../screens";
import {FavoritesScreen} from "../screens"; 
import {AddedPlacesScreen} from "../screens"; 
import {SettingsProfileScreen} from "../screens";

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


          {/* Pantalla de edición de perfil */}

          <Stack.Screen
          name="EditProfileScreen"
          component={EditProfileScreen}
        />

         <Stack.Screen
          name="FavoritesScreen"
          component={FavoritesScreen}
        />

         <Stack.Screen
          name="AddedPlacesScreen"
          component={AddedPlacesScreen}
        />

        <Stack.Screen
          name="SettingsProfileScreen"
          component={SettingsProfileScreen}
        />

        {/* Fin de pantallas de las pantallas de edicion de perfil */}

      </Stack.Navigator>
  );
}
