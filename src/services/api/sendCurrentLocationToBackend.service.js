import { API_URL } from "./client";

export async function sendCurrentLocationToBackendService({ latitude, longitude }) {
  const response = await fetch(`${API_URL}/api/feed/location`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      latitude,
      longitude,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.message || "Error al enviar ubicación al backend");
  }

  return data;
}