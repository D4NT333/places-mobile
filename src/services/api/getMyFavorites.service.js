import client from "./client";
import { auth } from "../firebase/config";

export default async function getMyFavoritesService() {
  try {
    const user = auth.currentUser;

    if (!user) {
      return [];
    }

    const token = await user.getIdToken();

    const response = await client.get("/api/users/me/favorites", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return Array.isArray(response.data?.favorites)
      ? response.data.favorites
      : [];
  } catch (error) {
    console.error(
      "Error en getMyFavoritesService:",
      error?.response?.data || error.message
    );

    return [];
  }
}