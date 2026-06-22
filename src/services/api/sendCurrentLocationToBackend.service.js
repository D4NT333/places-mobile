import client from "./client";

export default async function sendCurrentLocationToBackendService({
  latitude,
  longitude,
}) {
  try {
    const response = await client.post("/api/feed/location", {
      latitude,
      longitude,
    });

    return response.data;
  } catch (error) {
    console.warn("No se pudo enviar ubicación al backend:", {
      message: error.message,
      code: error.code,
      status: error.response?.status,
      data: error.response?.data,
      baseURL: error.config?.baseURL,
      url: error.config?.url,
    });

    return {
      ok: false,
      message: "No se pudo enviar ubicación al backend",
      data: null,
    };
  }
}