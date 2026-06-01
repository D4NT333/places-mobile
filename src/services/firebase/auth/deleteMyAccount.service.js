import { auth } from "../config";
import client from "../../api/client";

export async function deleteMyAccountService() {
  const currentUser = auth.currentUser;

  if (!currentUser) {
    throw new Error("No hay una sesión activa.");
  }

  const idToken = await currentUser.getIdToken(true);

  try {
    const response = await client.delete("/api/auth/me", {
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
      data: {
        confirmPermanentDelete: true,
      },
    });

    return response.data;
  } catch (error) {
    console.error(
      "Error en deleteMyAccountService:",
      error.response?.data || error
    );

    throw new Error(
      error.response?.data?.message || "No se pudo eliminar la cuenta."
    );
  }
}