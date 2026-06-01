import { auth } from "../config";
import client from "../../api/client";

export async function getMobileMeService() {
  const currentUser = auth.currentUser;

  if (!currentUser) {
    throw new Error("No hay una sesión activa.");
  }

  const idToken = await currentUser.getIdToken(true);

  try {
    const response = await client.get("/api/auth/me", {
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
    });

    return response.data.user;
  } catch (error) {
    console.error("Error en getMobileMeService:", error.response?.data || error);

    throw new Error(
      error.response?.data?.message || "No se pudo obtener la cuenta."
    );
  }
}