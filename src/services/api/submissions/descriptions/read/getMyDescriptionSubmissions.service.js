import { getAuth } from "firebase/auth";
import client from "../../../client";

async function getMyDescriptionSubmissionsService() {
  const auth = getAuth();
  const user = auth.currentUser;

  if (!user) {
    throw new Error("No hay un usuario autenticado.");
  }

  const token = await user.getIdToken();

  try {
    const response = await client.get("/api/description-submissions/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data.submissions || [];
  } catch (error) {
    console.log("Error en getMyDescriptionSubmissionsService:", {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message,
      url: error.config?.url,
      baseURL: error.config?.baseURL,
    });

    const message =
      error.response?.data?.message ||
      error.response?.data?.error ||
      "No se pudieron cargar tus descripciones añadidas.";

    throw new Error(message);
  }
}

export default getMyDescriptionSubmissionsService;