import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import FooterNav from "../components/FooterNav";
import {HomeScreen, SearchScreen, AddPlacesScreen, MetricsScreen, ProfileScreen } from "../screens";

const Tab = createBottomTabNavigator();

export default function AppRoutes() {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <FooterNav {...props} />}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Add" component={AddPlacesScreen} />
      <Tab.Screen name="Metrics" component={MetricsScreen} />
      <Tab.Screen name="User" component={ProfileScreen} />
    </Tab.Navigator>
  );
}