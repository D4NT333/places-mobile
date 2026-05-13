import {
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
  signOut,
} from "firebase/auth";

import { auth } from "../config";
import client from "../../api/client";

export default async function registerWithEmailService({
  name,
  email,
  password,
  birthDate,
}) {
  const cleanName = name.trim();
  const cleanEmail = email.trim().toLowerCase();

  const userCredential = await createUserWithEmailAndPassword(
    auth,
    cleanEmail,
    password
  );

  const firebaseUser = userCredential.user;

  await updateProfile(firebaseUser, {
    displayName: cleanName,
  });

  await sendEmailVerification(firebaseUser);

  const idToken = await firebaseUser.getIdToken(true);

  const response = await client.post("/api/auth/register/email", {
    idToken,
    name: cleanName,
    birthDate,
  });

  await signOut(auth);

  return {
    user: response.data?.user,
    email: cleanEmail,
  };
}