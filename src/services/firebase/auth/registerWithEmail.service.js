import {
  createUserWithEmailAndPassword,
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
  const totalStart = Date.now();

  const cleanName = name.trim();
  const cleanEmail = email.trim().toLowerCase();

  console.log("🔥 registerWithEmailService iniciado");

  try {
    const createStart = Date.now();

    const userCredential = await createUserWithEmailAndPassword(
      auth,
      cleanEmail,
      password
    );

    console.log(
      "⏱️ createUserWithEmailAndPassword:",
      Date.now() - createStart,
      "ms"
    );

    const firebaseUser = userCredential.user;

    const tokenStart = Date.now();

    const idToken = await firebaseUser.getIdToken();

    console.log("🔑 idToken existe:", !!idToken);
    console.log("🔑 idToken length:", idToken?.length);
    console.log("⏱️ getIdToken:", Date.now() - tokenStart, "ms");

    if (!idToken) {
      throw new Error("No se pudo obtener el token de Firebase.");
    }

    const backendStart = Date.now();

    const response = await client.post("/api/auth/register/email", {
      idToken,
      name: cleanName,
      birthDate,
    });

    console.log(
      "⏱️ backend /api/auth/register/email:",
      Date.now() - backendStart,
      "ms"
    );

    const emailVerificationStart = Date.now();

    await sendEmailVerification(firebaseUser);

    console.log(
      "⏱️ sendEmailVerification:",
      Date.now() - emailVerificationStart,
      "ms"
    );

    const signOutStart = Date.now();

    await signOut(auth);

    console.log("⏱️ signOut:", Date.now() - signOutStart, "ms");

    console.log(
      "✅ registerWithEmailService total:",
      Date.now() - totalStart,
      "ms"
    );

    return {
      user: response.data?.user,
      email: cleanEmail,
    };
  } catch (error) {
    console.log(
      "❌ registerWithEmailService error después de:",
      Date.now() - totalStart,
      "ms"
    );

    throw error;
  }
}