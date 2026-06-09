import client from "../../../client";
import { auth } from "../../../../firebase/config";

export default async function createPlaceSubmissionService(payload) {
  try {
    const idToken = await auth.currentUser?.getIdToken();

    if (!idToken) {
      throw new Error("No se pudo obtener el token del usuario.");
    }

    const response = await client.post(
      "/api/place-submissions",
      payload,
      {
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error(
      "createPlaceSubmissionService error:",
      error?.response?.data || error.message
    );
    throw error;
  }
}