import { sendPasswordResetEmail } from "firebase/auth";

import { auth } from "../config";
import checkLoginMethodService from "../../api/auth/read/checkLoginMethod.service";

export default async function recoverPasswordService({ email }) {
  const cleanEmail = email.trim().toLowerCase();

  if (!cleanEmail) {
    const error = new Error("Ingresa un correo válido.");
    error.code = "auth/email-required";
    throw error;
  }

  const methodCheck = await checkLoginMethodService({
    email: cleanEmail,
    requestedProvider: "password",
  });

  if (!methodCheck.exists) {
    const error = new Error(
      "No existe una cuenta registrada con este correo."
    );
    error.code = "auth/user-not-found";
    throw error;
  }

  if (!methodCheck.allowed) {
    const error = new Error(
      methodCheck.message ||
        "Esta cuenta fue creada con Google. Inicia sesión con Google."
    );
    error.code = "auth/wrong-provider";
    throw error;
  }

  await sendPasswordResetEmail(auth, cleanEmail);

  return {
    ok: true,
    email: cleanEmail,
    message: "Correo de recuperación enviado.",
  };
}