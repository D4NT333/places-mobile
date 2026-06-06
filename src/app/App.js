import React, { useEffect, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import RootNavigator from "../navigation/RootNavigator";

import { GestureHandlerRootView } from "react-native-gesture-handler";

import { AddPlaceDraftProvider } from "../context/AddPlaceDraftContext";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../services/firebase/config";

import { warmCatalogsCache } from "../services/firebase/warmCatalogsCache.service";

import { usePushNotifications } from "../hooks/usePushNotifications";

export default function App() {
  const [isLogged, setIsLogged] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      const canEnterApp = !!user && user.emailVerified === true;

      setAuthUser(canEnterApp ? user : null);
      setIsLogged(canEnterApp);
      setIsCheckingAuth(false);
    });

    return unsubscribe;
  }, []);

  //usePushNotifications(authUser);

  useEffect(() => {
    warmCatalogsCache();
  }, []);

  if (isCheckingAuth) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <AddPlaceDraftProvider>
          <NavigationContainer>
            <RootNavigator isLogged={isLogged} />
          </NavigationContainer>
        </AddPlaceDraftProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}