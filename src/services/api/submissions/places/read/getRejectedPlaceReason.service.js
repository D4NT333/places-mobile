import client from "../../../client";
import { auth } from "../../../../firebase/config";

export default async function getRejectedPlaceReasonService(submissionId) {
  if (!submissionId) {
    throw new Error("Falta submissionId para cargar el motivo de rechazo.");
  }

  const user = auth.currentUser;

  if (!user) {
    throw new Error("No hay usuario autenticado.");
  }

  const token = await user.getIdToken();

  const response = await client.get(
    `/api/place-submissions/my-places/${submissionId}/rejection`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data?.data || null;
}