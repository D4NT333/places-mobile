import {
  EmailAuthProvider,
  reauthenticateWithCredential,
} from "firebase/auth";

import { auth } from "../config";

export async function reauthenticatePasswordUserService(password) {
  const currentUser = auth.currentUser;

  if (!currentUser) {
    throw new Error("No hay una sesión activa.");
  }

  if (!currentUser.email) {
    throw new Error("La cuenta actual no tiene un correo asociado.");
  }

  if (!password?.trim()) {
    throw new Error("Ingresa tu contraseña actual.");
  }

  const credential = EmailAuthProvider.credential(
    currentUser.email,
    password.trim()
  );

  await reauthenticateWithCredential(currentUser, credential);

  return true;
}