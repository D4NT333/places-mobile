import { getAuth } from "firebase/auth";
import client from "../../../client";

export default async function createPhotoSubmissionService({
  placeId,
  photoSubmissionId,
  photos,
}) {
  if (!placeId) {
    throw new Error(
      "Falta el identificador del lugar."
    );
  }

  if (!photoSubmissionId) {
    throw new Error(
      "Falta el identificador de la propuesta."
    );
  }

  if (!Array.isArray(photos) || photos.length === 0) {
    throw new Error(
      "No se proporcionaron fotografías."
    );
  }

  const auth = getAuth();
  const user = auth.currentUser;

  if (!user) {
    throw new Error(
      "No hay un usuario autenticado."
    );
  }

  const token = await user.getIdToken();

  const response = await client.post(
    `/api/places/${placeId}/photo-submissions`,
    {
      photoSubmissionId,
      photos,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
}