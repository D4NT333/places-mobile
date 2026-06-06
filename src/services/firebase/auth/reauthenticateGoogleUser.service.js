import { GoogleAuthProvider, reauthenticateWithCredential } from "firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

import { auth } from "../config";

GoogleSignin.configure({
  webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
  offlineAccess: false,
});

export async function reauthenticateGoogleUserService() {
  const currentUser = auth.currentUser;

  if (!currentUser) {
    throw new Error("No hay una sesión activa.");
  }

  await GoogleSignin.hasPlayServices({
    showPlayServicesUpdateDialog: true,
  });

  const signInResult = await GoogleSignin.signIn();

  const idTokenFromSignIn =
    signInResult?.data?.idToken ||
    signInResult?.idToken ||
    null;

  const idTokenFromTokens = idTokenFromSignIn
    ? idTokenFromSignIn
    : (await GoogleSignin.getTokens())?.idToken;

  if (!idTokenFromTokens) {
    throw new Error("No se pudo obtener el token de Google.");
  }

  const credential = GoogleAuthProvider.credential(idTokenFromTokens);

  await reauthenticateWithCredential(currentUser, credential);

  return true;
}