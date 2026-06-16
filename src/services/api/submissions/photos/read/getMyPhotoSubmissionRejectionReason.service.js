import { getAuth } from "firebase/auth";
import client from "../../../client";

export default async function getMyPhotoSubmissionRejectionReasonService(
  submissionId
) {
  if (!submissionId) {
    throw new Error(
      "El identificador de la propuesta es obligatorio."
    );
  }

  const auth = getAuth();
  const user = auth.currentUser;

  if (!user) {
    throw new Error(
      "No se encontró un usuario autenticado."
    );
  }

  const token =
    await user.getIdToken();

  const response = await client.get(
    `/api/photo-submissions/my/${encodeURIComponent(
      submissionId
    )}/rejection-reason`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const rejection =
    response.data?.rejection;

  if (!rejection) {
    throw new Error(
      "El backend no devolvió el motivo del rechazo."
    );
  }

  return rejection;
}