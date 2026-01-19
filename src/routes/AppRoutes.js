import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import {MainPager} from "../components";
import {AddPlacesScreen, PlaceDetailScreen} from "../screens";
import {EditProfileScreen} from "../screens";
import {FavoritesScreen} from "../screens"; 
import {AddedPlacesScreen} from "../screens"; 


import {SettingsProfileScreen} from "../screens";
import {NotificationScreen} from "../screens";
import {SearchRadiusScreen} from "../screens";
import {ReportProblemScreen} from "../screens";
import {SuggestImprovementScreen} from "../screens";
import {ChangePasswordScreen} from "../screens";
import {ChangeEmailScreen} from "../screens";
import {EliminateAccountScreen} from "../screens";
import {TermsConditionsScreen} from "../screens";
import {PrivacyNoticeScreen} from "../screens";

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

        {/* Fin de pantallas de las pantallas de edicion de perfil */}

        {/* Pantallas de settings */}

        <Stack.Screen
          name="SettingsProfileScreen"
          component={SettingsProfileScreen}
        />

        <Stack.Screen
          name="NotificationScreen"
          component={NotificationScreen}
        /> 
        
        <Stack.Screen
          name="SearchRadiusScreen"
          component={SearchRadiusScreen}
        />

        <Stack.Screen
          name="ReportProblemScreen"
          component={ReportProblemScreen}
        />

        <Stack.Screen
          name="SuggestImprovementScreen"
          component={SuggestImprovementScreen}
        />

        <Stack.Screen
          name="ChangePasswordScreen"
          component={ChangePasswordScreen}
        />

        <Stack.Screen
          name="ChangeEmailScreen"
          component={ChangeEmailScreen}
        />

        <Stack.Screen
          name="EliminateAccountScreen"
          component={EliminateAccountScreen}
        />

        <Stack.Screen
          name="TermsConditionsScreen"
          component={TermsConditionsScreen}
        />

        <Stack.Screen
          name="PrivacyNoticeScreen"
          component={PrivacyNoticeScreen}
        />

        {/* Fin de pantallas de settings */}

      </Stack.Navigator>
  );
}
