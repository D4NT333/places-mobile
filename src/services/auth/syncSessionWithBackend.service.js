import { API_URL } from "../api/client";

export default async function syncSessionWithBackendService({ idToken }) {
  try {
    const response = await fetch(`${API_URL}/api/auth/session`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${idToken}`,
      },
      body: JSON.stringify({}),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data?.message || "No se pudo sincronizar la sesión con el backend.");
    }

    return data;
  } catch (error) {
    console.error("syncSessionWithBackendService error:", error);
    throw error;
  }
}