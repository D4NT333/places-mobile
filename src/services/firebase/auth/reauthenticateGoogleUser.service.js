import { GoogleAuthProvider, reauthenticateWithCredential } from "firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

import { auth } from "../config";

export async function reauthenticateGoogleUserService() {
  const currentUser = auth.currentUser;

  if (!currentUser) {
    throw new Error("No hay una sesión activa.");
  }

  await GoogleSignin.hasPlayServices({
    showPlayServicesUpdateDialog: true,
  });

  await GoogleSignin.signIn();

  const { idToken } = await GoogleSignin.getTokens();

  if (!idToken) {
    throw new Error("No se pudo obtener el token de Google.");
  }

  const credential = GoogleAuthProvider.credential(idToken);

  await reauthenticateWithCredential(currentUser, credential);

  return true;
}