import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import { auth } from "../../firebase/config";

import checkLoginMethodService from "../../api/checkLoginMethod.service";

let isConfigured = false;

function configureGoogleSignin() {
  if (isConfigured) return;

  GoogleSignin.configure({
    webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
    offlineAccess: false,
  });

  isConfigured = true;
}

export default async function googleSignInService() {
  try {
    configureGoogleSignin();

    await GoogleSignin.hasPlayServices();
    await GoogleSignin.signOut();

    const signInResult = await GoogleSignin.signIn();

    const googleIdToken =
      signInResult?.data?.idToken ||
      signInResult?.idToken ||
      null;

    const googleEmail =
      signInResult?.data?.user?.email ||
      signInResult?.user?.email ||
      null;

    if (!googleIdToken) {
      throw new Error("No se pudo obtener el token de Google.");
    }

    if (!googleEmail) {
      throw new Error("No se pudo obtener el correo de Google.");
    }

    const cleanGoogleEmail = googleEmail.trim().toLowerCase();

    /**
     * IMPORTANTE:
     * Validamos ANTES de signInWithCredential.
     * Así evitamos que Firebase vincule Google a una cuenta creada con password.
     */
    const methodCheck = await checkLoginMethodService({
      email: cleanGoogleEmail,
      requestedProvider: "google",
    });

    if (methodCheck.exists && !methodCheck.allowed) {
      await GoogleSignin.signOut();

      const error = new Error(
        methodCheck.message ||
          "Esta cuenta fue creada con correo y contraseña. Inicia sesión con correo y contraseña."
      );

      error.code = "auth/wrong-provider";
      throw error;
    }

    const googleCredential = GoogleAuthProvider.credential(googleIdToken);

    const userCredential = await signInWithCredential(auth, googleCredential);

    const firebaseUser = userCredential.user;
    const firebaseIdToken = await firebaseUser.getIdToken();

    console.log("googleIdToken length:", googleIdToken?.length);
    console.log("googleIdToken first chars:", googleIdToken?.slice(0, 30));

    console.log("firebaseIdToken length:", firebaseIdToken?.length);
    console.log("firebaseIdToken first chars:", firebaseIdToken?.slice(0, 30));
    console.log("firebaseIdToken parts:", firebaseIdToken?.split(".")?.length);

    return {
      firebaseUser,
      idToken: firebaseIdToken,
    };
  } catch (error) {
    console.error("googleSignInService error:", error);
    throw error;
  }
}