import client from "../../client";

export default async function getPlacesFeedService({
  limit = 20,
  cursor = null,
} = {}) {
  try {
    const params = {
      limit,
    };

    if (cursor) {
      params.cursor = cursor;
    }

    const response = await client.get("/api/places/feed", {
      params,
    });

    const result = response.data;

    return {
      places: Array.isArray(result?.places) ? result.places : [],
      nextCursor: result?.nextCursor || null,
      hasMore: Boolean(result?.hasMore),
    };
  } catch (error) {
    console.error(
      "Error en getPlacesFeedService:",
      error?.response?.data || error.message
    );

    throw new Error(
      error?.response?.data?.message ||
        "No se pudieron cargar los lugares del feed."
    );
  }
}