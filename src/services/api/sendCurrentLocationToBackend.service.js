import client from "./client";

export default async function sendCurrentLocationToBackendService({ latitude, longitude }) {
  try {
    const response = await client.post("/api/feed/location", {
      latitude,
      longitude,
    });

    return response.data;
  } catch (error) {
    console.error(
      "Error al enviar ubicación al backend:",
      error?.response?.data || error.message
    );
    throw error;
  }
}