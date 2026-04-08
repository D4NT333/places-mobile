import React, { useEffect, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import RootNavigator from "../navigation/RootNavigator";

import "react-native-gesture-handler";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { AddPlaceDraftProvider } from "../context/AddPlaceDraftContext";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/config";

export default function App() {
  const [isLogged, setIsLogged] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLogged(!!user);
      setIsCheckingAuth(false);
    });

    return unsubscribe;
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