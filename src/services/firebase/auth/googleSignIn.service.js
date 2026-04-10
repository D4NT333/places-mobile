import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import { auth } from "../../firebase/config";

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

    if (!googleIdToken) {
      throw new Error("No se pudo obtener el token de Google.");
    }

    const googleCredential = GoogleAuthProvider.credential(googleIdToken);

    const userCredential = await signInWithCredential(auth, googleCredential);

    const firebaseUser = userCredential.user;
    const firebaseIdToken = await firebaseUser.getIdToken();

    return {
      firebaseUser,
      idToken: firebaseIdToken,
    };
  } catch (error) {
    console.error("googleSignInService error:", error);
    throw error;
  }
}