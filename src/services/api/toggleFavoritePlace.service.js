import client from "./client";
import { auth } from "../firebase/config";

export default async function toggleFavoritePlaceService(placeId) {
  try {
    const user = auth.currentUser;

    if (!user) {
      throw new Error("Debes iniciar sesión para guardar favoritos.");
    }

    const token = await user.getIdToken();

    const response = await client.post(
      `/api/users/me/favorites/${placeId}/toggle`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return {
      isFavorite: Boolean(response.data?.isFavorite),
      savesCount: Number(response.data?.savesCount) || 0,
    };
  } catch (error) {
    console.error(
      "Error en toggleFavoritePlaceService:",
      error?.response?.data || error.message
    );

    throw new Error(
      error?.response?.data?.message ||
        "No se pudo actualizar el favorito."
    );
  }
}