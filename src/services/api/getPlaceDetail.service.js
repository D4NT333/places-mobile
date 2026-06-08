import client from "./client";

export default async function getPlaceDetailService(placeId) {
  try {
    if (!placeId) {
      throw new Error("El id del lugar es obligatorio.");
    }

    const response = await client.get(`/api/places/${placeId}/detail`);

    const result = response.data;

    return {
      place: result?.place || null,
      lsearchReviews: Array.isArray(result?.lsearchReviews)
        ? result.lsearchReviews
        : [],
      googleReviews: Array.isArray(result?.googleReviews)
        ? result.googleReviews
        : [],
    };
  } catch (error) {
    console.error(
      "Error en getPlaceDetailService:",
      error?.response?.data || error.message
    );

    throw new Error(
      error?.response?.data?.message ||
        "No se pudo cargar el detalle del lugar."
    );
  }
}