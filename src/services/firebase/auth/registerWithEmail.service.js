import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signOut,
} from "firebase/auth";

import { auth } from "../config";
import client from "../../api/client";

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function postRegisterEmailWithRetry({ idToken, name, birthDate }) {
  let lastError;

  for (let attempt = 1; attempt <= 2; attempt += 1) {
    try {
      const backendStart = Date.now();

      const response = await client.post("/api/auth/register/email", {
        idToken,
        name,
        birthDate,
      });

      console.log(
        `⏱️ backend /api/auth/register/email intento ${attempt}:`,
        Date.now() - backendStart,
        "ms"
      );

      return response;
    } catch (error) {
      lastError = error;

      console.log(
        `❌ backend /api/auth/register/email falló intento ${attempt}:`,
        error?.message
      );

      if (attempt < 2) {
        await wait(800);
      }
    }
  }

  throw lastError;
}

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

  let firebaseUser = null;
  let response = null;

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

    firebaseUser = userCredential.user;

    const tokenStart = Date.now();

    const idToken = await firebaseUser.getIdToken();

    console.log("🔑 idToken existe:", !!idToken);
    console.log("🔑 idToken length:", idToken?.length);
    console.log("⏱️ getIdToken:", Date.now() - tokenStart, "ms");

    if (!idToken) {
      throw new Error("No se pudo obtener el token de Firebase.");
    }

    try {
      response = await postRegisterEmailWithRetry({
        idToken,
        name: cleanName,
        birthDate,
      });
    } catch (backendError) {
      console.log(
        "⚠️ Backend falló después de crear Auth. Se intentará enviar correo de todos modos:",
        backendError?.message
      );
    }

    /**
     * Si el backend alcanzó a poner displayName en Firebase Auth,
     * reload lo trae al usuario actual.
     * Si backend falló antes, reload no rompe nada.
     */
    try {
      const reloadStart = Date.now();

      await firebaseUser.reload();

      console.log("⏱️ firebaseUser.reload:", Date.now() - reloadStart, "ms");
      console.log(
        "👤 displayName después de reload:",
        auth.currentUser?.displayName
      );
    } catch (reloadError) {
      console.log("⚠️ No se pudo refrescar usuario:", reloadError?.message);
    }

    const currentUser = auth.currentUser || firebaseUser;

    if (!currentUser) {
      throw new Error("No hay usuario actual para enviar verificación.");
    }

    const emailVerificationStart = Date.now();

    await sendEmailVerification(currentUser);

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
      user: response?.data?.user || null,
      email: cleanEmail,
    };
  } catch (error) {
    console.log(
      "❌ registerWithEmailService error después de:",
      Date.now() - totalStart,
      "ms"
    );

    /**
     * Si algo falló después de crear el usuario, intentamos cerrar sesión
     * para no dejar la app en estado raro.
     */
    if (firebaseUser || auth.currentUser) {
      try {
        await signOut(auth);
      } catch (signOutError) {
        console.log("⚠️ Error cerrando sesión tras fallo:", signOutError);
      }
    }

    throw error;
  }
}