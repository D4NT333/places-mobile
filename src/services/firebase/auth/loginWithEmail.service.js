import { signInWithEmailAndPassword, signOut } from "firebase/auth";

import { auth } from "../config";
import syncSessionWithBackendService  from "./syncSessionWithBackend.service";

export default async function loginWithEmailService({ email, password }) {
  const cleanEmail = email.trim().toLowerCase();

  const userCredential = await signInWithEmailAndPassword(
    auth,
    cleanEmail,
    password
  );

  const firebaseUser = userCredential.user;

  await firebaseUser.reload();

  const refreshedUser = auth.currentUser;

  if (!refreshedUser?.emailVerified) {
    await signOut(auth);

    const error = new Error("Correo no verificado");
    error.code = "auth/email-not-verified";
    throw error;
  }

  const idToken = await refreshedUser.getIdToken(true);

  const sessionData = await syncSessionWithBackendService({ idToken });

  return {
    firebaseUser: refreshedUser,
    sessionData,
  };
}