import { getAuth } from "firebase/auth";
import client from "../../../client";

export default async function getDescriptionSubmissionRejectionReasonService(
  submissionId
) {
  const auth = getAuth();
  const user = auth.currentUser;

  if (!user) {
    throw new Error("No hay usuario autenticado.");
  }

  if (!submissionId) {
    throw new Error("Falta el id de la propuesta.");
  }

  const token = await user.getIdToken();

  const response = await client.get(
    `/api/description-submissions/${submissionId}/rejection-reason`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data?.rejectionReason || null;
}