import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import {MainPager} from "../components";
import {PlaceDetailScreen} from "../screens";
import {ChangeDescriptionScreen} from "../screens";

import {CommentScreen} from "../screens";

import {FavoritesScreen} from "../screens"; 

import {AddedPlacesScreen} from "../screens";
import {AddedPhotosScreen} from "../screens";
import {AddedDescriptionScreen} from "../screens";

import { VisualizedAddedPlacesScreen } from "../screens";
import { VisualizedAddedDescriptionScreen } from "../screens";

import {EditAddedPlacesScreen} from "../screens";

import {FilterSectionScreen} from "../screens";


import {EditProfileScreen} from "../screens";
import {EditProfileNameScreen} from "../screens";
import {EditProfileDescriptionScreen} from "../screens";
import {EditProfilePhotoScreen} from "../screens";  

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

export default function AppNavigator() {
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

        <Stack.Screen
          name="ChangeDescriptionScreen"
          component={ChangeDescriptionScreen}
        />

        <Stack.Screen
          name="CommentScreen"
          component={CommentScreen}
        />
        
          {/* Pantalla de edición de perfil */}
          <Stack.Screen
          name="EditProfileScreen"
          component={EditProfileScreen}
        />

        <Stack.Screen
          name="EditProfileNameScreen"
          component={EditProfileNameScreen}
        />  

        <Stack.Screen
          name="EditProfileDescriptionScreen"
          component={EditProfileDescriptionScreen}
        />

        <Stack.Screen
          name="EditProfilePhotoScreen"
          component={EditProfilePhotoScreen}
        />

        {/* Fin de las pantallas de edición de perfil */}


        {/* Pantalla de agregar lugares */}
         <Stack.Screen
          name="FavoritesScreen"
          component={FavoritesScreen}
        />

         <Stack.Screen
          name="AddedPlacesScreen"
          component={AddedPlacesScreen}
        />

        <Stack.Screen
        name="VisualizedAddedPlacesScreen"
        component={VisualizedAddedPlacesScreen}
        />

        <Stack.Screen
          name="EditAddedPlacesScreen"
          component={EditAddedPlacesScreen}
        />

        <Stack.Screen
          name="AddedPhotosScreen"
          component={AddedPhotosScreen}
        />

        <Stack.Screen
          name="AddedDescriptionScreen"
          component={AddedDescriptionScreen}
        />

        <Stack.Screen
        name="VisualizedAddedDescriptionScreen"
        component={VisualizedAddedDescriptionScreen}
        />

        <Stack.Screen
          name="FilterSectionScreen"
          component={FilterSectionScreen}
        />
        {/* Fin de la pantalla de agregar lugares */}

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
