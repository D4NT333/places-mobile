import { getAuth } from "firebase/auth";
import client from "../../../client";

export default async function getMyPhotoSubmissionDetailService(
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
    )}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const submission =
    response.data?.submission;

  if (!submission) {
    throw new Error(
      "El backend no devolvió la propuesta."
    );
  }

  return submission;
}