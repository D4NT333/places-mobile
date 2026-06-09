import client from "../../client";
import { auth } from "../../../firebase/config";

export default async function createPlaceReviewService(placeId, payload) {
  try {
    const user = auth.currentUser;

    if (!user) {
      throw new Error("Debes iniciar sesión para publicar una reseña.");
    }

    if (!placeId) {
      throw new Error("El id del lugar es obligatorio.");
    }

    const token = await user.getIdToken();

    const response = await client.post(
      `/api/reviews/places/${placeId}`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error(
      "Error en createPlaceReviewService:",
      error?.response?.data || error.message
    );

    throw new Error(
      error?.response?.data?.message ||
        "No se pudo publicar la reseña."
    );
  }
}