import { getAuth } from "firebase/auth";
import client from "../../../client";

async function getMyDescriptionSubmissionDetailService(submissionId) {
  if (!submissionId) {
    throw new Error("El id de la propuesta es obligatorio.");
  }

  const auth = getAuth();
  const user = auth.currentUser;

  if (!user) {
    throw new Error("No hay un usuario autenticado.");
  }

  const token = await user.getIdToken();

  try {
    const response = await client.get(
      `/api/description-submissions/me/${submissionId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data.submission;
  } catch (error) {
    console.log("Error en getMyDescriptionSubmissionDetailService:", {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message,
      url: error.config?.url,
      baseURL: error.config?.baseURL,
    });

    const message =
      error.response?.data?.message ||
      error.response?.data?.error ||
      "No se pudo cargar el detalle de la descripción.";

    throw new Error(message);
  }
}

export default getMyDescriptionSubmissionDetailService;