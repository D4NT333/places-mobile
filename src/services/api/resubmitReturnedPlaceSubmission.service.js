import client from "./client";
import { auth } from "../firebase/config";

export default async function resubmitReturnedPlaceSubmissionService({
  submissionId,
  payload,
}) {
  if (!submissionId) {
    throw new Error("Falta submissionId para reenviar la propuesta.");
  }

  const user = auth.currentUser;

  if (!user) {
    throw new Error("No hay usuario autenticado.");
  }

  const token = await user.getIdToken();

  const response = await client.patch(
    `/api/place-submissions/my-places/returned/${submissionId}/resubmit`,
    payload,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data?.data || null;
}